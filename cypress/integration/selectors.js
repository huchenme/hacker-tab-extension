describe('Selectors', () => {
  it('should fetch correct endpoint when change language selector', () => {
    cy.fetchReposAndWait();
    cy.findByTestId('top-bar')
      .findByText('All languages')
      .should('be.visible');
    cy.findByTestId('top-bar')
      .findByText('Trending today')
      .should('be.visible');

    cy.findByTestId('language-selector').click();
    cy.route({
      method: 'GET',
      url:
        'https://ghapi.huchen.dev/repositories?language=javascript&since=daily',
      response: 'fixture:javascript',
      delay: 100,
    }).as('fetchRepos');
    cy.findByTestId('language-selector')
      .findByText('JavaScript')
      .click();
    cy.findAllByTestId('loading-card').should('have.length', 10);
    cy.wait('@fetchRepos');
    cy.findByTestId('loading-card').should('not.exist');
    cy.shouldHaveRepoCards(25);
    cy.getLocalStorage('selectedLanguage').should('eq', 'javascript');
    cy.fixture('javascript').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
    cy.findByTestId('top-bar')
      .findByText('JavaScript')
      .should('be.visible');
    cy.findByTestId('top-bar')
      .findByText('Trending today')
      .should('be.visible');

    cy.findByTestId('period-selector').click();
    cy.route({
      method: 'GET',
      url:
        'https://ghapi.huchen.dev/repositories?language=javascript&since=monthly',
      response: 'fixture:javascript-monthly',
      delay: 100,
    }).as('fetchRepos');
    cy.findByTestId('period-selector')
      .findByText('Trending this month')
      .click();
    cy.findAllByTestId('loading-card').should('have.length', 10);
    cy.wait('@fetchRepos');
    cy.findByTestId('loading-card').should('not.exist');
    cy.shouldHaveRepoCards(25);
    cy.getLocalStorage('selectedPeriod').should('eq', 'monthly');
    cy.fixture('javascript-monthly').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
    cy.findByTestId('top-bar')
      .findByText('JavaScript')
      .should('be.visible');
    cy.findByTestId('top-bar')
      .findByText('Trending this month')
      .should('be.visible');
  });

  it('should have selectors selected correctly when localStorage was set', () => {
    cy.seedLocalStorage({
      selectedPeriod: 'monthly',
      selectedLanguage: 'javascript',
      repositories: 'javascript-monthly',
    });
    cy.visit('/');
    cy.findByTestId('top-bar')
      .findByText('JavaScript')
      .should('be.visible');
    cy.findByTestId('top-bar')
      .findByText('Trending this month')
      .should('be.visible');
  });

  it('should have default selectors selected when local storage was not set', () => {
    cy.fetchReposAndWait();
    cy.findByTestId('top-bar')
      .findByText('All languages')
      .should('be.visible');
    cy.findByTestId('top-bar')
      .findByText('Trending today')
      .should('be.visible');
  });
});
