describe('load repositories', () => {
  it('load repo cards', () => {
    cy.fetchReposAndWait();
    cy.findByText('Trending Repositories').should('exist');
    cy.shouldHaveRepoCards(25);
  });

  it('shows loading placeholder while loading', () => {
    cy.fetchRepos({ delay: 100 });
    cy.visit('/');
    cy.queryAllByTestId('loading-card').should('have.length', 10);
    cy.wait('@fetchRepos');
    cy.queryByTestId('loading-card').should('not.exist');
    cy.shouldHaveRepoCards(25);
  });

  it('should set local storage values', () => {
    const now = new Date('2020-01-01T08:30:00').getTime();
    cy.clock(now);
    cy.fetchReposAndWait();
    cy.getLocalStorage('selectedLanguage').should('eq', '__ALL__');
    cy.getLocalStorage('selectedPeriod').should('eq', 'daily');
    cy.getLocalStorage('schemaVersion').should('eq', '2');
    cy.getLocalStorage('lastUpdatedTime').should('eq', now);
    cy.fixture('trending').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
  });

  it('should not fetch if repos is cached in local storage', () => {
    cy.server({ enable: false });
    cy.setLocalStorage('schemaVersion', '2');
    cy.fixture('trending').then(json => {
      cy.setLocalStorage('repositories', json);
    });
    cy.visit('/');
    cy.queryByTestId('loading-card').should('not.exist');
    cy.shouldHaveRepoCards(25);
  });

  it('should show last updated time', () => {
    cy.clock(new Date('2020-01-01T08:30:00').getTime());
    cy.setLocalStorage('schemaVersion', '2');
    cy.fixture('trending').then(json => {
      cy.setLocalStorage('repositories', json);
    });
    cy.setLocalStorage(
      'lastUpdatedTime',
      new Date('2020-01-01T08:20:00').getTime()
    );
    cy.visit('/');
    cy.queryByText('10 minutes ago').should('exist');
  });

  it('click last updated time should refetch repositories', () => {
    const now = new Date('2020-01-01T08:30:00').getTime();
    const tenMinutesAgo = new Date('2020-01-01T08:20:00').getTime();
    cy.clock(now);
    cy.setLocalStorage('schemaVersion', '2');
    cy.fixture('trending').then(json => {
      cy.setLocalStorage('repositories', json);
    });
    cy.setLocalStorage('lastUpdatedTime', tenMinutesAgo);
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://github-trending-api.now.sh/repositories*',
      response: 'fixture:trending-2',
    }).as('fetchRepos');
    cy.visit('/');
    cy.findByText('10 minutes ago').click();
    cy.wait('@fetchRepos');
    cy.getLocalStorage('lastUpdatedTime').should('eq', now);
    cy.fixture('trending-2').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
  });

  it('clears localStorage if schema version is different', () => {
    const now = new Date('2020-01-01T08:30:00').getTime();
    const tenMinutesAgo = new Date('2020-01-01T08:20:00').getTime();
    cy.clock(now);
    cy.setLocalStorage('schemaVersion', '1');
    cy.fixture('trending-2').then(json => {
      cy.setLocalStorage('repositories', json);
    });
    cy.setLocalStorage('lastUpdatedTime', tenMinutesAgo);
    cy.setLocalStorage('selectedLanguage', 'javascript');
    cy.setLocalStorage('selectedPeriod', 'weekly');

    cy.fetchReposAndWait();
    cy.getLocalStorage('selectedLanguage').should('eq', '__ALL__');
    cy.getLocalStorage('selectedPeriod').should('eq', 'daily');
    cy.getLocalStorage('schemaVersion').should('eq', '2');
    cy.getLocalStorage('lastUpdatedTime').should('eq', now);
    cy.fixture('trending').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
  });
});
