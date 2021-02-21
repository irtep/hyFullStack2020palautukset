import { customers } from '../../data/db';
import { CustomersNoSsn, NewCustomer, Customer } from '../types/types';

// this would be an emergency solution, for example if couldnt export
// it from .ts file as it is now.. well you know...
//const dbData: Array<Customer> = db as Array<Customer>;

// gets all without ssn number
const getEntries = (): CustomersNoSsn[] => {
  return customers.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const findPatient = (patientID: string): Customer | undefined => {
  console.log('trying to find patient: ', patientID);
  return customers.find(p => p.id === patientID);
};

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
  addEntry,
  findPatient
};
