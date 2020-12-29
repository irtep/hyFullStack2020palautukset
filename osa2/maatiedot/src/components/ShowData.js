import React from 'react';
import ShowEntity from './ShowEntity';
import ShowDetails from './ShowDetails';

const ShowData = ({showThese}) => {

      return (
      <div>
        {showThese.map( entity => {
          return(
            <ShowEntity
            key= {entity.name}
            entity= {entity.name}
            />
           )
        })}
      </div>
    );
}

export default ShowData;

/*
{showThese.map( person => {
  return(
    <Person
    key= {person.name}
    person= {person}
    />
   )
})}
*/
/*
// if many hits
if (showThese.length > 1) {
  console.log('show list');
  return (
    <div>
      {showThese.map( entity => {
        return(
          <ShowEntity
          key= {entity.name}
          entity= {entity.name}
          />
         )
      })}
    </div>
  );
}
// if only one hit
if (showThese.length === 1) {
  console.log('show 1');
  return(
    <div>
      only one:
      {showThese[0].name}
    </div>
  );
}
*/
