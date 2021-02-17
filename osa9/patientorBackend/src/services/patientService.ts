import { customers } from '../../data/db';
import { CustomersNoSsn, NewCustomer, Customer } from '../types/types';

// this would be an emergency solution, for example if couldnt export
// it from .ts file as it is now.. well you know...
//const dbData: Array<Customer> = db as Array<Customer>;

// gets all without ssn number
const getEntries = (): CustomersNoSsn[] => {
  return customers.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};
/*

"id": "d2773336-f723-11e9-8f0b-362b9e155667",
"name": "John McClane",
"dateOfBirth": "1986-07-09",
"ssn": "090786-122X",
"gender": "male",
"occupation": "New york city cop"
name, ssn, dateOfBirth, gender, occupation
*/
const addEntry = (newEntry: NewCustomer): Customer => {
  const newCusto = {
    id: JSON.stringify(Math.random()*(6000 - 1)),
    ...newEntry
  };
  customers.push(newCusto);
  return newCusto;
};
export default {
  getEntries,
  addEntry
};
/*
const addDiary = (
    date: string, weather: Weather, visibility: Visibility, comment: string
  ): DiaryEntry => {

  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    date,
    weather,
    visibility,
    comment,
  }

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
*/
