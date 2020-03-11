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

  it.skip('should set local storage values', () => {});

  it.skip('should not fetch if repos is cached in local storage', () => {});

  it.skip('should show last updated time', () => {});
});
