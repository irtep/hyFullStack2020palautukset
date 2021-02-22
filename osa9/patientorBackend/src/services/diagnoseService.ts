import { diagnoses} from '../../data/db';
import { Diagnose } from '../types/types';

// this would be an emergency solution, for example if couldnt export
// it from .ts file as it is now.. well you know...
//const dbData: Array<Customer> = db as Array<Customer>;

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getEntries
};
