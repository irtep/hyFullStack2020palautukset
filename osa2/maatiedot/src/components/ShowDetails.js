import React from 'react';
import LiObject from './LiObject';
import ShowImg from './ShowImg';

const ShowDetails = ({entity}) => {
  return(
    <div>
      <h2>
        {entity.name}
      </h2>
      <p>
       capital: {entity.capital}<br/>
       population: {entity.population}
      </p>
      <h3>
        languages
      </h3>
      <ul>
        {entity.languages.map( language => {
          return (
            <LiObject
              LiContent= {language.name}
              key= {language.name}
          />);
        })}
      </ul>
      <ShowImg
        url= {entity.flag}
        alt= "country flag image"
      />
    </div>
  );
}

export default ShowDetails;
/*
name
capital, population, languages, flag
*/
