describe('Dark Mode', () => {
  it('set local storage preferDarkMode to true if in dark mode', () => {
    cy.fetchReposAndWait({ darkMode: true });
    cy.window().its('localStorage.preferDarkMode').should('eq', 'true');
    cy.findByLabelText('Sun Icon').should('exist');
    cy.findByLabelText('Moon Icon').should('not.exist');
  });

  it('set local storage preferDarkMode to false if in light mode', () => {
    cy.fetchReposAndWait({ darkMode: false });
    cy.window().its('localStorage.preferDarkMode').should('eq', 'false');
    cy.findByLabelText('Moon Icon').should('exist');
    cy.findByLabelText('Sun Icon').should('not.exist');
  });

  it('click on icon should change mode and local storage value', () => {
    cy.fetchReposAndWait({ darkMode: true });
    cy.findByLabelText('Sun Icon').click();
    cy.findByLabelText('Moon Icon').should('exist');
    cy.findByLabelText('Sun Icon').should('not.exist');
    cy.getLocalStorage('preferDarkMode').should('eq', false);
    cy.findByLabelText('Moon Icon').click();
    cy.findByLabelText('Moon Icon').should('not.exist');
    cy.findByLabelText('Sun Icon').should('exist');
    cy.getLocalStorage('preferDarkMode').should('eq', true);
  });
});
