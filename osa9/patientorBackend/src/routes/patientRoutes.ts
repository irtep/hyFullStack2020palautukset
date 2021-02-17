import express from 'express';
import patientServices from '../services/patientService';
import toNewCustomerEntry from "../utils/utils";
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('requesting patients');
  res.send(patientServices.getEntries());
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

/*
import toNewDiaryEntry from '../utils';

// ...

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
*/
