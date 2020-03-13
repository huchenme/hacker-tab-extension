describe('Empty state', () => {
  it('shows empty state when response is empty', () => {
    cy.fetchReposAndWait({ response: [] });
    cy.findByText('Trending Repositories').should('not.exist');
    cy.findByTestId('repo-card').should('not.exist');
    cy.findByTestId('empty-state').should('exist');
  });

  it('does not show empty state when response is normal', () => {
    cy.fetchReposAndWait();
    cy.findByText('empty-state').should('not.exist');
  });
});
