import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'fetchRepos',
  ({ response = 'fixture:trending', delay = 0, status = 200 } = {}) => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://ghapi.huchen.dev/repositories?since=daily',
      response,
      delay,
      status,
    }).as('fetchRepos');
  }
);

Cypress.Commands.add('waitResponse', () => {
  cy.wait('@fetchRepos');
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(100);
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

Cypress.Commands.add('clockRestore', () => {
  cy.tick().then((clock) => {
    clock.restore();
  });
});

Cypress.Commands.add('waitAllErrors', () => {
  cy.clock();
  cy.wait('@fetchRepos');
  cy.tick(2000);
  cy.wait('@fetchRepos');
  cy.tick(4000);
  cy.wait('@fetchRepos');
  cy.clockRestore();
});

Cypress.Commands.add('errorFetchReposAndWait', () => {
  cy.fetchRepos({ status: 500 });
  cy.visit('/');
  cy.waitAllErrors();
});

Cypress.Commands.add('shouldHaveRepoCards', (num) => {
  cy.findByTestId('loaded-repo-list')
    .findAllByTestId('repo-card')
    .should('have.length', num);
});

Cypress.Commands.add('shouldHaveFirstCardContains', (value) => {
  cy.findByTestId('loaded-repo-list')
    .findAllByTestId('repo-card')
    .first()
    .contains(value);
});

Cypress.Commands.add('getLocalStorage', (key) => {
  cy.window().its('localStorage').its(key).then(JSON.parse);
});

Cypress.Commands.add('setLocalStorage', (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))
);

Cypress.Commands.add(
  'seedLocalStorage',
  ({
    schemaVersion = '2',
    selectedLanguage = '__ALL__',
    selectedSpokenLanguage = '__ALL__',
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
    if (typeof selectedSpokenLanguage !== undefined) {
      cy.setLocalStorage('selectedSpokenLanguage', selectedSpokenLanguage);
    }
    if (typeof selectedPeriod !== undefined) {
      cy.setLocalStorage('selectedPeriod', selectedPeriod);
    }
    if (typeof repositories !== undefined) {
      cy.fixture(repositories).then((json) => {
        cy.setLocalStorage('repositories', json);
      });
    }
    if (typeof lastUpdatedTime !== undefined) {
      cy.setLocalStorage('lastUpdatedTime', lastUpdatedTime);
    }
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);
  }
);
