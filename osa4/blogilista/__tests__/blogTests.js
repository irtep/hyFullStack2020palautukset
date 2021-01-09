const listHelper = require('../utils/list_helper');
const testVariables = require('../utils/testVariables');
// for supertest
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const noteObjects = testVariables.map(note => new Blog(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);
});
// test.only if want to test only one
test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct amount of blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(testVariables.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map(r => r.title);

  expect(contents).toContain(
    'Go To Statement Considered Harmful'
  );
});

//console.log('tV ', testVariables);
//console.log('tv.ta ', testVariables.testArray);
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
// test.only runs only that one
describe('total likes', () => {
  const blogs = testVariables;

  test('total likes checker', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favourite blog', () => {
  const blogs = testVariables;

  test('total likes checker', () => {
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    );
  });
});

describe('most blogs', () => {
  const blogs = testVariables;

  test('most blogs checker', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most likes', () => {
  const blogs = testVariables;

  test('most likes checker', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
