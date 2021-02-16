type Gender = 'male' | 'female' | 'other';

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
  ssn: string
};

export type CustomersNoSsn = Omit<Customer, 'ssn'>;

/*
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;
// ^ = const todo: TodoPreview
*/
