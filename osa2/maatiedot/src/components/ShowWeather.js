import React,  { useState, useEffect } from 'react';
import axios from 'axios';

const ShowWeather = ({location, weatherApiKey}) => {
  const [ show, setShow ] = useState('waiting weather data');
  let weatherData = {current: 'placehold'};
  let forRender = 'waiting data';
  const params = {
    query: location,
    access_key: weatherApiKey
  };
  // get countries from api on start
  useEffect( () => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        weatherData = response.data;
        forRender = <><h3>weather in {location}</h3><p>temperature: {weatherData.current.temperature}</p>
        <p><img src= {weatherData.current.weather_icons[0]}alt= "weather icon"/></p><p>wind: {weatherData.current.wind_speed} direction: {weatherData.current.wind_dir}</p></>;
        setShow(forRender)
      })
  }, []);

  return (
    <div>
      {show}
    </div>
  );
}

export default ShowWeather;
