describe('smoke', () => {
  it('open the browser', () => {
    cy.visit('/');
    cy.findByText('1').click();
  });
});
