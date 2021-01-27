// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
/*
// create
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};
*/
Cypress.Commands.add('createBlog', ({ url, author, title, likes }) => {
  //console.log('content ', content);
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { url, author, title, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('userDetails')).token}`
    }
  });
  cy.visit('http://localhost:3000');
});
