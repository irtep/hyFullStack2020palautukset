import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import ShowPersons from './components/ShowPersons';
import Notification from './components/Notification';
import dbServices from './services/dbControl';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState({name: '', number: ''});
  const [ showThese, setShow ] = useState([]);
  const [ notificationMsg, setMsg] = useState({msg: null, badNews: false});

  // get persons from db on start
  useEffect( () => {
    dbServices
      .getAll()
      .then(initialData => {
        console.log('ini data: ', initialData);
        setPersons(initialData)
        setShow(initialData)
      })
      .catch(error => {
        console.log('error on loading database!', error);
    })
  }, []);

  // handle changes
  const handleNameChange = (event) => {
    const entryCopied = newName;
    entryCopied.name = event.target.value;
    setNewName(entryCopied);
  }
  const handleNumberChange = (event) => {
    const entryCopied = newName;
    entryCopied.number = event.target.value;
    setNewName(entryCopied);
  }

  // add new entry
  const addNew = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName.name,
      number: newName.number
    }
    const dublicatedList = persons.filter( pers => pers.name === noteObject.name);

    if (newName.name !== '' && dublicatedList.length === 0){
      // not dublicated, can add
      const newList = persons.concat(noteObject);
      setPersons(newList);
      setShow(newList);
      // update to db
      dbServices.create(noteObject).catch(err => console.log('error on adding to database!', err));
      // make notification
      setMsg({msg: `added ${noteObject.name}!`, badNews: false});
      setTimeout( () => { setMsg({msg: null, badNews: false}) }, 2000);
    } else if (dublicatedList.length !== 0){
      //alert(`${newName.name} is already added`);
      //
      if (window.confirm(`${newName.name} is already added, replace new number with old?`)) {
        dbServices.update(dublicatedList[0].id, noteObject)
         .then( () => {
           // reload modified db
           dbServices
             .getAll()
             .then(initialData => {
               setPersons(initialData)
               setShow(initialData)
             })
             .catch(error => {
               console.log('error on loading database!', error);
           })
         }
       ).catch(err => console.log('error on adding to database!', err));
       // make notification
       setMsg({msg: `updated number of ${noteObject.name}!`, badNews: false});
       setTimeout( () => { setMsg({msg: null, badNews: false}) }, 2000);
      }
    }
    setNewName({name: '', number: ''});
    // empty fields
    document.getElementById('nameField').value = '';
    document.getElementById('numberField').value = '';
  }

  // filter what to show
  const filtering = (event) => {
    const lowCaseAll = event.target.value.toLowerCase();
    if (event.target.value !== '') {
      const showing = persons.filter( person => person.name.toLowerCase().includes(lowCaseAll));
      setShow(showing);
    } else {
      setShow(persons);
    }
  }

  // delete function
  const deleteThis = (event) => {
    if (window.confirm(`really delete details of ${event.target.name}`)) {
      // delete
      dbServices.erase(event.target.id)
       .then( () => {
         // reload modified db
         dbServices
           .getAll()
           .then(initialData => {
             setPersons(initialData)
             setShow(initialData)
           })
           .catch(error => {
             console.log('error on loading database!', error);
         })
       })
      .catch(err => {
        console.log(err);
        // make notification
        setMsg({msg: `info of ${event.target.name} has already been deleted from database!`, badNews: true});
        setTimeout( () => { setMsg({msg: null, badNews: false}) }, 5000);
          // reload modified db
          dbServices
            .getAll()
            .then(initialData => {
              setPersons(initialData)
              setShow(initialData)
            })
            .catch(error => {
              console.log('error on loading database!', error);
          })
      });
      // make notification
      setMsg({msg: `removed details of ${event.target.name}!`, badNews: false});
      setTimeout( () => { setMsg({msg: null, badNews: false}) }, 2000);
    }
  }

  return (
    <div>
        <Header name= "Phonebook"/>

        <Notification message= {notificationMsg}/>

        <Filter actions= {filtering}/>

        <Header name= "Add a new"/>

        <PersonForm
          addNew= {addNew}
          handleNameChange= {handleNameChange}
          handleNumberChange= {handleNumberChange}
        />

       <Header name= "Numbers"/>

       <ShowPersons
         showThese= {showThese}
         deleteFunc= {deleteThis}/>
    </div>
  )

}

export default App;
