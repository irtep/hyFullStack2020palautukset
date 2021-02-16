import { customers } from '../../data/db';
import { CustomersNoSsn } from '../types/types';

// this would be an emergency solution, for example if couldnt export
// it from .ts file as it is now.. well you know...
//const dbData: Array<Customer> = db as Array<Customer>;

const getEntries = (): CustomersNoSsn[] => {
  return customers.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};
/*
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry [] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

"id": "d2773336-f723-11e9-8f0b-362b9e155667",
"name": "John McClane",
"dateOfBirth": "1986-07-09",
"ssn": "090786-122X",
"gender": "male",
"occupation": "New york city cop"

const addEntry = (newEntry: Customer) => {
  newEntry.id = db.length + 1;
  db.push(newEntry);
  return newEntry;
};
*/
export default {
  getEntries,
  //addEntry
};

/*
type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;
// ^ = const todo: TodoPreview
*/
