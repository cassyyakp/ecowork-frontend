describe('Parcours complet : connexion → réservation via panier', () => {
  const utilisateur = {
    id_utilisateur: 1, 
    prenom: 'Ferdinand',
    nom: 'Dev',
    email: 'ferdinand@gmail.com',
    password: 'ferdinand123',
  };

  const getDynamicDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  it('un utilisateur se connecte et réserve un espace avec des dates uniques', () => {
    cy.intercept('POST', '**/api/login').as('loginRequest');
    cy.intercept('GET', '**/api/espaces*').as('getEspaces');
    cy.intercept('GET', '**/api/typeespaces').as('getTypes');
    cy.intercept('GET', '**/api/reservations').as('getInitialReservations');
    cy.intercept('GET', '**/api/espaces/*').as('getEspaceDetail');
    cy.intercept('POST', '**/api/reservations').as('createReservation');

    cy.visit('/AuthPage');
    cy.get('[data-cy="login-email"]').type(utilisateur.email, { delay: 100 });
    cy.get('[data-cy="login-password"]').type(utilisateur.password, { delay: 100 });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      const { token, user } = interception.response.body;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('user', JSON.stringify(user || utilisateur));
    });

    cy.url().should('include', '/accueil');

    cy.contains(/espaces/i).click();
    cy.wait(['@getEspaces', '@getTypes', '@getInitialReservations'], { timeout: 20000 });
    cy.contains('Chargement...').should('not.exist');

    cy.get('[data-cy="card-espace"]').first().scrollIntoView().click({ force: true });

    cy.wait('@getEspaceDetail');
    cy.get('[data-cy="btn-ajouter-panier"]').click();
    cy.url().should('include', '/panier');

    const randomGap = Math.floor(Math.random() * 300) + 15; 
    const dateDebut = getDynamicDate(randomGap);
    const dateFin = getDynamicDate(randomGap + 4);

    cy.get('[data-cy="panier-date-debut"]').clear().type(dateDebut, { delay: 100 });
    cy.get('[data-cy="panier-date-fin"]').clear().type(dateFin, { delay: 100 });

    cy.get('[data-cy="panier-mode-paiement"]').select('totalite');
    cy.get('[data-cy="panier-recap-prix"]').should('be.visible');

    cy.get('[data-cy="panier-submit"]').should('not.be.disabled').click();

    cy.wait('@createReservation').then((xhr) => {
      expect(xhr.response.statusCode).to.be.oneOf([200, 201]);
    });

    cy.intercept('GET', '**/api/reservations').as('getFinalList');
    
    
    cy.visit('/reservations');
    
    cy.wait('@getFinalList', { timeout: 15000 });

    cy.get('[data-cy="page-mes-reservations"]').should('be.visible');
    cy.contains(dateDebut).should('be.visible');
  });
});