import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import ShowPersons from './components/ShowPersons';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState({name: '', number: ''});
  const [ showThese, setShow ] = useState([]);

  // get persons from db on start
  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShow(response.data)
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
      const newList = persons.concat(noteObject);
      setPersons(newList);
    } else if (dublicatedList.length !== 0){
      alert(`${newName.name} is already added`);
    }
    setNewName({name: '', number: ''});
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

  return (
    <div>
        <Header name= "Phonebook"/>

        <Filter actions= {filtering}/>

        <Header name= "Add a new"/>

        <PersonForm
          addNew = {addNew}
          handleNameChange= {handleNameChange}
          handleNumberChange= {handleNumberChange}
        />

       <Header name= "Numbers"/>

       <ShowPersons showThese= {showThese}/>
    </div>
  )

}

export default App;
