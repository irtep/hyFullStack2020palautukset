import express from 'express';
import { calcBmi } from './bmiCalculator';
import { calcExes } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi/', ( req, res ) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error: "invalid parameters! need to be integers (weight and height)!"
    });
    return;
  }
  res.send({
    weight: weight,
    height: height,
    bmi: calcBmi(weight, height)
  });
});
app.post('/exercises/', ( req, res ) => {
  const { days, target } = req.body;
  if ( !days || !target ) {
    res.status(400).send({
      error: "parameters missing"
    });
  }
  if (days.some(isNaN) || isNaN(target) ) {
    res.status(400).send({
      error: "malformatted parameters"
    })
  }
  res.send(calcExes(target, days));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
