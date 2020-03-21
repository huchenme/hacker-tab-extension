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
  ({ response = 'fixture:trending', delay = 0, status = 200 } = {}) => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://github-trending-api.now.sh/repositories?since=daily',
      response,
      delay,
      status,
    }).as('fetchRepos');
  }
);

Cypress.Commands.add('waitResponse', () => {
  cy.wait('@fetchRepos');
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(100); // for localstorage to set
});

Cypress.Commands.add(
  'fetchReposAndWait',
  ({ response, delay, status, darkMode = true } = {}) => {
    cy.fetchRepos({ response, delay, status });
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: darkMode,
            addListener: () => {},
          });
      },
    });
    cy.waitResponse();
  }
);

Cypress.Commands.add('shouldHaveRepoCards', num => {
  cy.findByTestId('loaded-repo-list')
    .findAllByTestId('repo-card')
    .should('have.length', num);
});

Cypress.Commands.add('shouldHaveFirstCardContains', value => {
  cy.findByTestId('loaded-repo-list')
    .findAllByTestId('repo-card')
    .first()
    .contains(value);
});

Cypress.Commands.add('getLocalStorage', key => {
  cy.window()
    .its('localStorage')
    .its(key)
    .then(JSON.parse);
});

Cypress.Commands.add('setLocalStorage', (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))
);

Cypress.Commands.add(
  'seedLocalStorage',
  ({
    schemaVersion = '2',
    selectedLanguage = '__ALL__',
    selectedPeriod = 'daily',
    repositories = 'trending',
    lastUpdatedTime = new Date().getTime() - 10 * 60000,
  } = {}) => {
    if (typeof schemaVersion !== undefined) {
      cy.setLocalStorage('schemaVersion', schemaVersion);
    }
    if (typeof selectedLanguage !== undefined) {
      cy.setLocalStorage('selectedLanguage', selectedLanguage);
    }
    if (typeof selectedPeriod !== undefined) {
      cy.setLocalStorage('selectedPeriod', selectedPeriod);
    }
    if (typeof repositories !== undefined) {
      cy.fixture(repositories).then(json => {
        cy.setLocalStorage('repositories', json);
      });
    }
    if (typeof lastUpdatedTime !== undefined) {
      cy.setLocalStorage('lastUpdatedTime', lastUpdatedTime);
    }
  }
);
