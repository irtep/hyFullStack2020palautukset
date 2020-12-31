import React from 'react';
import Person from './Person';
import ActionButton from './ActionButton';

const ShowPersons = ({showThese, deleteFunc}) => {
  return (
    <>
    {showThese.map( person => {
      return(
        <div key= {person.name}>
          <Person
            person= {person}
          />
          <ActionButton
            id= {person.id}
            action= {deleteFunc}
            name= {person.name}
          />
        </div>
       )
    })}
    </>
  )
}

export default ShowPersons;
