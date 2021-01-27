const user = {
  name: 'george',
  username: 'george',
  password: 'smith'
};
const user2 = {
  name: 'james',
  username: 'jamesK',
  password: 'kuikka'
};
const blog1 = {
  url: 'onelike.fi',
  author: 'james',
  title: 'this should have one like',
  likes: 1
};
const blog2 = {
  url: 'threelikes.fi',
  author: 'james',
  title: 'this should have three likes',
  likes: 3
};
const blog3 = {
  url: 'twolike.fi',
  author: 'james',
  title: 'this should have two likes',
  likes: 2
};

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.request('POST', 'http://localhost:3001/api/users/', user2);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click();
      cy.get('#username').type('george');
      cy.get('#password').type('smith');
      cy.get('#loginButton').click();

      cy.contains('logged in');
    });

    it('fails with wrong credentials', function() {
      cy.contains('login').click();
      cy.get('#username').type('james');
      cy.get('#password').type('wrong');
      cy.get('#loginButton').click();

      cy.contains('wrong credentials');
      cy.get('.notifications').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click();
      cy.get('#username').type('george');
      cy.get('#password').type('smith');
      cy.get('#loginButton').click();

      cy.contains('logged in');
    });

    it('A blog can be created', function() {
      cy.contains('create new').click();
      cy.get('#inputTitle').type('super karate blog');
      cy.get('#author').type('daniel larusso');
      cy.get('#url').type('www.miyagidojo.rus');
      cy.contains('send new blog').click();
      cy.contains('Successfully');
      cy.contains('super karate blog');
    });

    it('A blog can be liked', function() {
      cy.contains('create new').click();
      cy.get('#inputTitle').type('like this blog');
      cy.get('#author').type('mr liker');
      cy.get('#url').type('yeagh');
      cy.contains('send new blog').click();
      cy.contains('show').click();
      cy.contains('Like').click();
      cy.contains('Like ok!');
    });

    it('A blog can be deleted', function() {
      cy.contains('create new').click();
      cy.get('#inputTitle').type('like this blog');
      cy.get('#author').type('mr liker');
      cy.get('#url').type('yeagh');
      cy.contains('send new blog').click();
      cy.contains('show').click();
      cy.contains('DELETE').click();
      cy.contains('deleted:');
    });

    it('Can not delete if not adder of blog', function() {
      cy.contains('create new').click();
      cy.get('#inputTitle').type('my block!!');
      cy.get('#author').type('geroge');
      cy.get('#url').type('yeagh.fi');
      cy.contains('send new blog').click();
      cy.contains('Logout').click();
      cy.contains('login').click();
      cy.get('#username').type('jamesK');
      cy.get('#password').type('kuikka');
      cy.get('#loginButton').click();
      cy.contains('show').click();
      cy.get('DELETE').should('not.exist');
    });

    it('blogs are sorted by most likes', function() { // continue from this
      cy.createBlog(blog1); // 1 likes
      cy.createBlog(blog2); // 3 likes
      cy.createBlog(blog3); // 2 likes
      cy.get('.blogNote').then( (blogNotes) => {
        cy.wrap(blogNotes[0]).should('contain', 'three likes');
        cy.wrap(blogNotes[1]).should('contain', 'two likes');
        cy.wrap(blogNotes[2]).should('contain', 'one like');
      });
    });
  });
});
