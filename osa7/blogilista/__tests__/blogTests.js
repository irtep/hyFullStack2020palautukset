const listHelper = require('../utils/list_helper');
const testVariables = require('../utils/testVariables');
const bcrypt = require('bcrypt');
const User = require('../models/user');
// for supertest
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

const api = supertest(app);

// USER TESTS
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    // For user tests
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root',
      name: 'root man', passwordHash });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb();
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await listHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('min chars and required fields filters', async () => {
    const usersAtStart = await listHelper.usersInDb();
    const userTests = [{
      username: '32',
      name: '21343421',
      passwordHash: '234234' },
    {
      username: '23434',
      name: '22',
      passwordHash: '12231312' },{
      username: '123123',
      name: '123231',
      passwordHash: '' },
    {
      username: '',
      name: '123231',
      passwordHash: '423342' },{
      username: '123231',
      name: '123123',
      passwordHash: '' }
    ];
    userTests.forEach( async user => {
      await api
        .post('/api/users')
        .send(user);
    });
    const usersAtEnd = await listHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

// BLOG TESTS
beforeEach(async () => {
  await Blog.deleteMany({});
  const noteObjects = testVariables.map(note => new Blog(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);
});

test('http post works', async () => {
  const userForToken = {
    username: 'root',
    id: '5fff3a871201660a48297b4e',
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const newBlog = { author: 'SuperGuy', title: 'theBlog',
    url: 'ijffjijdfi', likes: 22, userId: 'superxxxid' };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog);
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(7);
});

test('cant post without token', async () => {
  const newBlog = { author: 'SuperGuy', title: 'theBlog',
    url: 'ijffjijdfi', likes: 22 };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401);
});

test('url and title are required', async () => {
  const userForToken = {
    username: 'root',
    id: '5fff3a871201660a48297b4e',
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const newBlog = { author: 'SuperGuy', likes: 22, userId: 'superxxxid' };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test('if likes not defined, it is set to 0', async () => {
  const userForToken = {
    username: 'root',
    id: '5fff3a871201660a48297b4e',
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  const newBlog = { author: 'SuperGuy', title: 'theBlog', url: 'ijffjijdfi', userId: 'superxxxid' };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog);
  const response = await api.get('/api/blogs/');
  const content = response.body.filter( r => r.author === 'SuperGuy');
  expect(content[0].likes).toBe(0);
});

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

test('test that id is id, not _id', async() => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map(r => r.id);

  expect(contents).toBeDefined();
});

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
  console.log('closing connection');
  mongoose.connection.close();
});
