import express from 'express';
import cors from 'cors';
import { patients } from './patients';
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping/', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients/', (_req, res) => {
  console.log('requesting patients');
  res.send(patients);
});

app.post('/api/patients/', (req, res) => {
  console.log('got post: ', req.body);
  const newPatient = req.body;
  newPatient.id = patients.length + 1;
  patients.push(req.body);
  console.log('new list: ', patients);
  res.json(newPatient);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
got post:  {
  name: 'pete',
  ssn: '03030303',
  dateOfBirth: '202099-222a',
  occupation: 'slave',
  gender: 'male'
}
*/
