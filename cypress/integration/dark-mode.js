describe('Dark Mode', () => {
  it('set local storage preferDarkMode to true if in dark mode', () => {
    cy.fetchReposAndWait({ darkMode: true });
    cy.window()
      .its('localStorage.preferDarkMode')
      .should('eq', 'true');
    cy.queryByLabelText('Sun Icon').should('exist');
    cy.queryByLabelText('Moon Icon').should('not.exist');
  });

  it('set local storage preferDarkMode to false if in light mode', () => {
    cy.fetchReposAndWait({ darkMode: false });
    cy.window()
      .its('localStorage.preferDarkMode')
      .should('eq', 'false');
    cy.queryByLabelText('Moon Icon').should('exist');
    cy.queryByLabelText('Sun Icon').should('not.exist');
  });

  it('click on icon should change mode and local storage value', () => {
    cy.fetchReposAndWait({ darkMode: true });
    cy.queryByLabelText('Sun Icon').click();
    cy.queryByLabelText('Moon Icon').should('exist');
    cy.queryByLabelText('Sun Icon').should('not.exist');
    cy.getLocalStorage('preferDarkMode').should('eq', false);
    cy.queryByLabelText('Moon Icon').click();
    cy.queryByLabelText('Moon Icon').should('not.exist');
    cy.queryByLabelText('Sun Icon').should('exist');
    cy.getLocalStorage('preferDarkMode').should('eq', true);
  });
});
