import express from 'express';
import patientServices from '../services/patientService'
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('requesting patients');
  res.send(patientServices.getEntries());
});
/*
router.post('/', (req, res) => {
  const adding = patientServices.addEntry(req.body);
  res.json(adding);
});
*/
export default router;
