describe('I’m Feeling Lucky', () => {
  it('should have a lucky repo', () => {
    cy.fetchReposAndWait();

    cy.fixture('trending').then(json => {
      const names = json.map(repo => repo.name);
      cy.findByText('I’m Feeling Lucky').should('exist');
      cy.findByTestId('random-repo-list')
        .findAllByTestId('repo-card')
        .should('have.length', 1);
      cy.findByTestId('random-repo-list')
        .findByTestId('name')
        .invoke('text')
        .should('be.oneOf', names);
      cy.findByLabelText('Random Pick Button').click();
      cy.findByTestId('random-repo-list')
        .findAllByTestId('repo-card')
        .should('have.length', 1);
      cy.findByTestId('random-repo-list')
        .findByTestId('name')
        .invoke('text')
        .should('be.oneOf', names);
    });
  });

  it('reload should update the picked item', () => {
    cy.fetchReposAndWait();

    cy.fixture('trending').then(json => {
      const names = json.map(repo => repo.name);
      cy.findByTestId('random-repo-list')
        .findByTestId('name')
        .invoke('text')
        .should('be.oneOf', names);
    });

    cy.fixture('trending-2').then(json => {
      const names = json.map(repo => repo.name);
      cy.route({
        method: 'GET',
        url: 'https://github-trending-api.now.sh/repositories*',
        response: 'fixture:trending-2',
      }).as('fetchRepos');
      cy.findByTestId('last-updated-time').click();
      cy.waitResponse();
      cy.findByTestId('random-repo-list')
        .findByTestId('name')
        .invoke('text')
        .should('be.oneOf', names);
    });
  });
});
