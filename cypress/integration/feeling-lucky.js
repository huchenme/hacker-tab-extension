describe('I’m Feeling Lucky', () => {
  it('should have a lucky repo', () => {
    cy.fetchReposAndWait();
    cy.findByText('I’m Feeling Lucky').should('exist');
    cy.findByTestId('random-repo-list')
      .findAllByTestId('repo-card')
      .should('have.length', 1);
    cy.findByLabelText('Random Pick Button').click();
    cy.findByTestId('random-repo-list')
      .findAllByTestId('repo-card')
      .should('have.length', 1);
  });
});
