export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave: {
      startDate: string,
      endDate: string
  }
}

export interface Hospital extends BaseEntry {
  type: 'Hospital',
  discharge?: {
      date: string,
      criteria: string,
  }
}

export interface HealthCheck extends BaseEntry {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating;
}

// urgh, i would really need only one of these 3..
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export interface Diagnose {
  code: string,
  name: string,
  latin?: string
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharged {
  date: string,
  criteria: string
};

export interface Sickleaved {
  startDate: string,
  endDate: string
};

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: {startDate: string, endDate: string};
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type GetPatient = Patient | undefined;
