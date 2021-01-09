const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});
// show a certain that hits with id param given
blogsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then(note => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
//    .catch(error => next(error));
});

module.exports = blogsRouter;
