import React from 'react';
import ShowEntity from './ShowEntity';
import ShowDetails from './ShowDetails';
import ActionButton from './ActionButton';
import ShowWeather from './ShowWeather';

const ShowData = ({showThese, showByClick, weatherApiKey}) => {
  if (showThese.length === 1) {
    // got only one, that is not 'too many matches'
    if (showThese[0].name !== 'too many matches.') {
      return(
        <div>
          <ShowDetails entity= {showThese[0]}/>
          <ShowWeather
            location = {showThese[0].capital}
            weatherApiKey= {weatherApiKey}
          />
        </div>
      );
    } else {
      // if 'too many matches'
      return(
        <div>
          <ShowEntity
            entity= {showThese[0].name}
          />
        </div>
      );
    }
  } else {
    // 2 - 10 matches
    return (
      <div>
        {showThese.map( entity => {
          return(
            <div key= {entity.name}>
            <ShowEntity
              entity= {entity.name}
            /><ActionButton
                id= {entity.name}
                action = {showByClick}
              />
            </div>
           )
        })}
      </div>
    );
  }
}

export default ShowData;
