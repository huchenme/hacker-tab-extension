describe('Error state', () => {
  it('shows error banner when response is not 200', () => {
    cy.errorFetchReposAndWait();
    cy.findByTestId('empty-state').should('exist');
    cy.findByTestId('network-error-banner').should('exist');
    cy.findByLabelText('Close').click();
    cy.findByTestId('network-error-banner').should('not.exist');
  });

  it('should reload when click retry', () => {
    cy.errorFetchReposAndWait();
    cy.findByTestId('empty-state').should('exist');
    cy.findByTestId('network-error-banner').should('exist');
    cy.fetchRepos();
    cy.findByText('Retry').click();
    cy.findByTestId('network-error-banner').should('not.exist');
    cy.shouldHaveRepoCards(25);
  });

  it('should show error banner when repo was already loaded', () => {
    cy.fetchRepos({ status: 500 });
    cy.seedLocalStorage();
    cy.visit('/');
    cy.findByTestId('last-updated-time').click();
    cy.waitAllErrors();
    cy.findByTestId('network-error-banner').should('exist');
    cy.shouldHaveRepoCards(25);
  });

  it('does not show error banner when response is normal', () => {
    cy.fetchReposAndWait();
    cy.findByTestId('network-error-banner').should('not.exist');
  });
});
