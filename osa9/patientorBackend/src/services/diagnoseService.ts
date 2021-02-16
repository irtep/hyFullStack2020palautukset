import { diagnoses} from '../../data/db';
import { Diagnose } from '../types/types';

// this would be an emergency solution, for example if couldnt export
// it from .ts file as it is now.. well you know...
//const dbData: Array<Customer> = db as Array<Customer>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};
/*
const addEntry = (newEntry: Customer) => {
  newEntry.id = db.length + 1;
  db.push(newEntry);
  return newEntry;
};
*/
export default {
  getEntries,
//  addEntry
};
