import { NewCustomer, Gender } from '../types/types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseString = (str: any): string => {
  if (!str || !isString(str) ) {
    throw new Error('Incorrect or missing string: ' + str);
  }
  console.log('string ok! ', str);
  return str;
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewCustomerEntry = (object: any): NewCustomer => {
  return {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    dateOfBirth: parseString(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  };
};

export default toNewCustomerEntry;

/*
const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  };
};
*/
