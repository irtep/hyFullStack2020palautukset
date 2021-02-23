import express from 'express';
import patientServices from '../services/patientService';
import utilTools from "../utils/utils";
import { Customer, Entry } from '../types/types';
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
  try {
    const incoming = utilTools.toNewCustomerEntry(req.body);
    const adding = patientServices.addNewCustomer(incoming);
    res.json(adding);
  } catch (e) {
    res.status(400).send(e.message);
  }
//  const adding = patientServices.addEntry(req.body);
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const incoming: Entry = utilTools.newEntryCheck(req.body);
    const adding: Customer = patientServices.addEntry(id, incoming);
    res.json(adding);
  } catch (e){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});
export default router;
