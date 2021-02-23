import { customers } from '../../data/db';
import {
  CustomersNoSsn,
  NewCustomer,
  Customer,
  Entry
} from '../types/types';

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

const addNewCustomer = (newEntry: NewCustomer): Customer => {
  const newCusto = {
    id: JSON.stringify(Math.random()*(6000 - 1)),
    ...newEntry
  };
  customers.push(newCusto);
  return newCusto;
};

const addEntry = (patientID: string, entry: Entry): Customer => {
  const patient = findPatient(patientID);
  if (patient === undefined) {
    throw new Error('Patient not found...');
  } else {
    patient.entries = patient.entries.concat(entry);
    return patient;
  }
};

export default {
  getEntries,
  addNewCustomer,
  findPatient,
  addEntry
};
