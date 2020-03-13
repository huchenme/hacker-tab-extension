describe('Scroll Icon', () => {
  it('should scroll to top', () => {
    cy.seedLocalStorage();
    cy.visit('/');
    cy.findByLabelText('Scroll to Top Button').should('not.be.visible');
    cy.scrollTo(0, 300);
    cy.window()
      .its('pageYOffset')
      .should('eq', 300);
    cy.findByLabelText('Scroll to Top Button').should('be.visible');
    cy.findByLabelText('Scroll to Top Button').click();
    cy.window()
      .its('pageYOffset')
      .should('eq', 0);
    cy.findByLabelText('Scroll to Top Button').should('not.be.visible');
  });
});
