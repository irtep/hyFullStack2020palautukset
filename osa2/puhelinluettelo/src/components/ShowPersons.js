import React from 'react';
import Person from './Person';

const ShowPersons = ({showThese}) => {
  return (
    <>
    {showThese.map( person => {
      return(
        <Person
        key= {person.name}
        person= {person}
        />
       )
    })}
    </>
  )
}

export default ShowPersons;
