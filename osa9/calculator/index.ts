import express from 'express';
//import { calcBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi/', ( req, res ) => {
  const weight = req.query.weight;
  const height = req.query.height;
  console.log('got bmi: ', weight, height);
  //res.send(calcBmi(height, weight));
  res.send('ok');
});
/*
// show a blog with certain id
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});
*/

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
