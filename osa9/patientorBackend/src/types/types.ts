export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
};

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating?: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {startDate: string, endDate: string};
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  healthCheckRating?: HealthCheckRating;
  discharge?: {
    date: string,
    criteria: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Customer {
  id: string,
  name: string,
  gender: Gender,
  occupation: string,
  dateOfBirth: string,
  ssn: string,
  entries: Entry[]
};

export type CustomersNoSsn = Omit<Customer, 'ssn'>;
export type NewCustomer = Omit<Customer, 'id'>;
