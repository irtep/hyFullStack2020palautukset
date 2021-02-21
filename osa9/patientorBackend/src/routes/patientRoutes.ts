import express from 'express';
import patientServices from '../services/patientService';
import toNewCustomerEntry from "../utils/utils";
import { Customer } from '../types/types';
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('requesting patients');
  res.send(patientServices.getEntries());
});

router.get('/:id', (req, res) => {
  console.log('someone searching for: ', req.params.id);
  const id = req.params.id;
  const results: Customer | undefined = patientServices.findPatient(id);
  if (results === undefined) {
    res.status(404).send('Patient Not Found!');
  } else {
    res.send(results);
  }
});

router.post('/', (req, res) => {
  //const { name, ssn, dateOfBirth, gender, occupation } = req.body;
  try{
    const incoming = toNewCustomerEntry(req.body);
    const adding = patientServices.addEntry(incoming);
    res.json(adding);
  } catch (e) {
    res.status(400).send(e.message);
  }
//  const adding = patientServices.addEntry(req.body);
});

export default router;
