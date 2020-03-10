describe('smoke', () => {
  beforeEach(() => {});
  it('open the browser', () => {
    cy.server();
    cy.route(
      'GET',
      'https://github-trending-api.now.sh/repositories*',
      'fixture:trending'
    ).as('fetchRepos');
    cy.visit('/');
    cy.wait('@fetchRepos');
    cy.findByText('Trending Repositories').should('exist');
    cy.findByTestId('loaded-repo-list')
      .findAllByTestId('repo-card')
      .as('repoCards');
    cy.get('@repoCards').should('have.length', 25);
  });
});
