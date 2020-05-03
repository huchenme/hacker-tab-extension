describe('Load Repositories', () => {
  it('load repo cards', () => {
    cy.fetchReposAndWait();
    cy.findByText('Trending Repositories').should('exist');
    cy.shouldHaveRepoCards(25);
  });

  it('shows loading placeholder while loading', () => {
    cy.fetchRepos({ delay: 100 });
    cy.visit('/');
    cy.findAllByTestId('loading-card').should('have.length', 10);
    cy.wait('@fetchRepos');
    cy.findByTestId('loading-card').should('not.exist');
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
    cy.findByTestId('loading-card').should('not.exist');
    cy.shouldHaveRepoCards(25);
    cy.shouldHaveFirstCardContains('COVID-19 Italia - Monitoraggio situazione');
  });

  it('should show last updated time', () => {
    const now = new Date('2020-01-01T08:30:00').getTime();
    cy.clock(now);
    cy.seedLocalStorage({
      lastUpdatedTime: new Date('2020-01-01T08:20:00').getTime(),
    });
    cy.visit('/');
    cy.findByText('10 minutes ago').should('exist');
  });

  it('click last updated time should refetch repositories', () => {
    const now = new Date('2020-01-01T08:30:00').getTime();
    cy.clock(new Date(now).getTime());
    cy.seedLocalStorage({
      lastUpdatedTime: new Date('2020-01-01T08:20:00').getTime(),
    });
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://ghapi.huchen.dev/repositories?since=daily',
      response: 'fixture:trending-2',
    }).as('fetchRepos');
    cy.visit('/');
    cy.findByTestId('last-updated-time').click();
    cy.waitResponse();
    cy.getLocalStorage('lastUpdatedTime').should('eq', now);
    cy.fixture('trending-2').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
    cy.shouldHaveFirstCardContains(
      'An operating system designed for hosting containers'
    );
  });

  it('clears localStorage if schema version is different', () => {
    const now = new Date('2020-01-01T08:30:00').getTime();
    cy.clock(now);
    cy.seedLocalStorage({
      lastUpdatedTime: new Date('2020-01-01T08:20:00').getTime(),
      schemaVersion: '1',
      repositories: 'trending-2',
      selectedLanguage: 'javascript',
      selectedPeriod: 'weekly',
    });
    cy.fetchReposAndWait();
    cy.fixture('trending').then(json => {
      cy.getLocalStorage('repositories').should('deep.eq', json);
    });
    cy.getLocalStorage('selectedLanguage').should('eq', '__ALL__');
    cy.getLocalStorage('selectedPeriod').should('eq', 'daily');
    cy.getLocalStorage('schemaVersion').should('eq', '2');
    cy.getLocalStorage('lastUpdatedTime').should('eq', now);
  });
});
