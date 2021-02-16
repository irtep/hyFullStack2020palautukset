import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patientRoutes'
import diagnosesRouter from './routes/diagnosesRoute'
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping/', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
