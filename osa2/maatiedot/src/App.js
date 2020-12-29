import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Finder from './components/Finder';
import ShowData from './components/ShowData';

const App = () => {
  const [ allData, setData] = useState([]);
  const [ showData, setShow ] = useState([]);

  // get countries from api on start
  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, []);

  // functions
  // filter what to show
  const filtering = (event) => {
    // lowCase to get not case sensitive
    const lowCaseAll = event.target.value.toLowerCase();
    if (event.target.value !== '') {
      const showing = allData.filter( entry => entry.name.toLowerCase().includes(lowCaseAll));
      //if more than 10 hits
      if (showing.length > 10) {
        setShow([{name: 'too many matches.'}])
        // if 2-10 hits
      }  else if (showing.length > 1 && showing.length < 11) {
        setShow(showing);
        // if only one hit
      } else if (showing.length === 1){
        setShow(showing);
      }
      //if empty input
    } else {
      setShow([]);
    }
  }

  return (
    <div className="App">

      <Finder actions= {filtering}/>

      <ShowData showThese = {showData}/>

    </div>
  );
}

export default App;
