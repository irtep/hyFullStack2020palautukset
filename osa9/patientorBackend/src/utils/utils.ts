import {
  NewCustomer,
  Gender,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
 } from '../types/types';
/* eslint-disable @typescript-eslint/no-explicit-any */

// New customer validation
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
    occupation: parseString(object.occupation),
    entries: []
  };
};

// New entry validation
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
/*
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
*/
const validateHospital = (object: any): HospitalEntry => {
  if (!object.discharge || !object.discharge.date || !object.discharge.criteria) {
    throw new Error('Entry missing required fields!');
  }
  const newEntry: HospitalEntry = {
    id: JSON.stringify(Math.random()*(6000 - 1)),
    type: object.type,
    description: object.description,
    date: object.date,
    specialist: object.specialist,
    discharge: {
      date: object.discharge.date,
      criteria: object.discharge.criteria
    }
  };
  if (object.diagnosisCodes !== undefined) newEntry.diagnosisCodes = object.diagnosisCodes;
  return newEntry;
};

const validateOccupational = (object: any): OccupationalHealthcareEntry => {
  if (!object.employerName || !object.sickLeave || !object.sickLeave.startDate || !object.sickLeave.endDate) {
    throw new Error('not found all required fields');
  }
  if (!isString(object.employerName) || !isDate(object.sickLeave.startDate) || !isDate(object.sickLeave.endDate)) {
    throw new Error('Malformatted info!');
  }
  const newEntry: OccupationalHealthcareEntry = {
    id: JSON.stringify(Math.random()*(6000 - 1)),
    type: object.type,
    description: object.description,
    date: object.date,
    specialist: object.specialist,
    employerName: object.employerName,
    sickLeave: {
      startDate: object.sickLeave.startDate,
      endDate: object.sickLeave.endDate
    }
  };
  if (object.diagnosisCodes !== undefined) newEntry.diagnosisCodes = object.diagnosisCodes;
  return newEntry;
};

const validateHealthCheck = (object: any): HealthCheckEntry => {
  if (typeof(object.healthCheckRating) !== 'number') {
    throw new Error('Entry missing required fields!');
  }
  const newEntry: HealthCheckEntry = {
    id: JSON.stringify(Math.random()*(6000 - 1)),
    type: object.type,
    description: object.description,
    date: object.date,
    specialist: object.specialist,
    healthCheckRating: object.healthCheckRating
  };
  if (object.diagnosisCodes !== undefined) newEntry.diagnosisCodes = object.diagnosisCodes;
  return newEntry;
};

const newEntryCheck = (newEntry: any): Entry => {
  if (!newEntry.description || !newEntry.date || !newEntry.specialist || !newEntry.type) {
    throw new Error('required fields not found!');
  }
  switch (newEntry.type) {
    case 'Hospital':
      return validateHospital(newEntry);
    case 'HealthCheck':
      console.log('its a health check');
      return validateHealthCheck(newEntry);
    case 'OccupationalHealthcare':
      return validateOccupational(newEntry);
    default:
      throw new Error('new entrys type not found!');
  }
}

const utilTools = {
  newEntryCheck,
  toNewCustomerEntry
}

export default utilTools;
