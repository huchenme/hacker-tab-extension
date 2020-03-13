describe('Error state', () => {
  it('shows error banner when response is not 200', () => {
    cy.fetchReposAndWait({ status: 500 });
    cy.findByTestId('empty-state').should('exist');
    cy.findByTestId('network-error-banner').should('exist');
    cy.findByLabelText('Close').click();
    cy.findByTestId('network-error-banner').should('not.exist');
  });

  it('should reload when click retry', () => {
    cy.fetchReposAndWait({ status: 500 });
    cy.findByTestId('empty-state').should('exist');
    cy.findByTestId('network-error-banner').should('exist');
    cy.fetchRepos();
    cy.findByText('Retry').click();
    cy.findByTestId('network-error-banner').should('not.exist');
    cy.shouldHaveRepoCards(25);
  });

  it('should error banner when repo was already loaded', () => {
    cy.seedLocalStorage();
    cy.fetchRepos({ status: 500 });
    cy.visit('/');
    cy.findByText('10 minutes ago').click();
    cy.waitResponse();
    cy.tick(500);
    cy.findByTestId('network-error-banner').should('exist');
    cy.shouldHaveRepoCards(25);
  });

  it('does not show error banner when response is normal', () => {
    cy.fetchReposAndWait();
    cy.findByTestId('network-error-banner').should('not.exist');
  });
});
