import express from 'express';
import diagnoseServices from '../services/diagnoseService'
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('requesting diagnoses');
  res.send(diagnoseServices.getEntries());
});
/*
router.post('/', (req, res) => {
  const adding = patientServices.addEntry(req.body);
  res.json(adding);
});
*/
export default router;
