type Gender = 'Male' | 'Female' | 'Other';

export interface Customer {
  id: number,
  name: string,
  gender: Gender,
  occupation: string
};
// if need to set some type field optional, just add ?
// for example: occupation?: string
