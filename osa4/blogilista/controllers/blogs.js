const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

// show all blogs
blogsRouter.get('/', async (req, res) => {
  const blog = await Blog.find({});
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});
// add a blog
blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.json(savedBlog.toJSON());
});
// show a blog with certain id
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});
// delete blog
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});
//modificate blog
blogsRouter.put('/:id', async (req, res) => {
  const field = req.body.field;
  const newValue = req.body.newValue;
  // get blog that user wants to edit
  const blog = await Blog.findById(req.params.id);
  logger.info('got blog: ', blog);
  blog[field] = newValue;
  // make the modification
  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
  res.json(blog);
});

module.exports = blogsRouter;
