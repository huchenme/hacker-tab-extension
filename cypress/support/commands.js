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
import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'fetchRepos',
  ({ fixture = 'fixture:trending', delay = 0 } = {}) => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://github-trending-api.now.sh/repositories*',
      response: fixture,
      delay,
    }).as('fetchRepos');
  }
);

Cypress.Commands.add(
  'fetchReposAndWait',
  ({ fixture = 'fixture:trending', delay = 0, darkMode = true } = {}) => {
    cy.fetchRepos({ fixture, delay });
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: darkMode,
          });
      },
    });
    cy.wait('@fetchRepos');
  }
);

Cypress.Commands.add('shouldHaveRepoCards', num => {
  cy.findByTestId('loaded-repo-list')
    .findAllByTestId('repo-card')
    .should('have.length', num);
});
