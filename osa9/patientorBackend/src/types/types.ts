export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
};

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
};

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
