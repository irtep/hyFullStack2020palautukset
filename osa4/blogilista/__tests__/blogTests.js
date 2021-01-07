const listHelper = require('../utils/list_helper');
const testVariables = require('../utils/testVariables');
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
