/* eslint-disable */
/* global cy, expect, describe, it, beforeEach */

describe('Parcours complet d\'un utilisateur de la connexion jusqu\'à la réservation', () => {

  // utilisateur doit exister dans la BD
  const utilisateur = {
    id_utilisateur: 1, 
    prenom: 'Cassy',
    nom: 'elvire',
    email: 'cassy@gmail.com',
    password: 'cassy123',
  };

  
  const baseDate = new Date();
  const yearsAhead = Math.floor(Math.random() * 4) + 2;
  const randomDays = Math.floor(Math.random() * 300);
  baseDate.setFullYear(baseDate.getFullYear() + yearsAhead);
  baseDate.setDate(baseDate.getDate() + randomDays);

  const formatDateFromBase = (daysToAdd) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + daysToAdd);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dateDebut = formatDateFromBase(0);
  const dateFin = formatDateFromBase(4);


  it('un utilisateur se connecte et réserve un espace', () => {
    cy.intercept('POST', '**/api/login').as('loginRequest');
    cy.intercept('GET', '**/api/espaces*').as('getEspaces');
    cy.intercept('GET', '**/api/typeespaces').as('getTypes');
    cy.intercept('GET', '**/api/reservations').as('getInitialReservations');
    cy.intercept('GET', '**/api/espaces/*').as('getEspaceDetail');
    cy.intercept('POST', '**/api/reservations').as('createReservation');
    cy.intercept('GET', '**/api/me/reservations').as('getMesReservations');


    cy.log('Étape 1 : Connexion');
    cy.visit('/AuthPage');
    cy.wait(1000);
    
    cy.get('[data-cy="login-email"]').type(utilisateur.email, { delay: 100 });
    cy.get('[data-cy="login-password"]').type(utilisateur.password, { delay: 100 });
    cy.wait(1000); 
    
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginRequest', { timeout: 30000 }).then((interception) => {
      const { token, user } = interception.response.body;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('user', JSON.stringify(user || utilisateur));
    });

    cy.url({ timeout: 30000 }).should('include', '/accueil');
    cy.wait(2500);


    cy.log('Étape 2 : Navigation vers les espaces');
    cy.contains(/espaces/i).click();
    cy.wait(['@getEspaces', '@getTypes', '@getInitialReservations'], { timeout: 60000 });
    cy.contains('Chargement...').should('not.exist');
    cy.wait(3000); 


    cy.log('Étape 3 : Sélection d\'un espace');
    cy.get('[data-cy="card-espace"]', { timeout: 50000 })
      .first()
      .scrollIntoView();
    cy.wait(3000); 
    
    cy.get('[data-cy="card-espace"]').first().click({ force: true });
    cy.wait('@getEspaceDetail', { timeout: 30000 });
    cy.get('[data-cy="page-show-espace"]', { timeout: 30000 }).should('be.visible');
    cy.wait(5000);

    
    cy.log('Étape 4 : Ajout au panier');
    cy.get('[data-cy="btn-ajouter-panier"]').click();
    cy.url({ timeout: 10000 }).should('include', '/panier');
    cy.get('[data-cy="page-panier"]').should('be.visible');
    cy.wait(2500);

    
    cy.log('Étape 5 : Remplissage des dates');
    cy.log(`Date début : ${dateDebut}`);
    cy.log(`Date fin : ${dateFin}`);

    cy.get('[data-cy="panier-date-debut"]').clear().type(dateDebut, { delay: 100 });
    cy.wait(2000); 
    
    cy.get('[data-cy="panier-date-fin"]').clear().type(dateFin, { delay: 100 });
    cy.wait(1500); 

    cy.get('[data-cy="panier-mode-paiement"]').select('totalite');
    cy.wait(2000); 
    
    cy.get('[data-cy="panier-recap-prix"]').should('be.visible');
    cy.wait(2000);

    cy.log('Étape 6 : Validation');
    cy.get('[data-cy="panier-submit"]').should('not.be.disabled').click();

    cy.wait('@createReservation', { timeout: 30000 }).then((xhr) => {
      expect(xhr.response.statusCode).to.be.oneOf([200, 201]);
      cy.log('Réservation créée !');
    });

    cy.log('Étape 7 : Redirection vers les réservations');
    cy.url({ timeout: 50000 }).should('include', '/reservations');
    cy.wait('@getMesReservations', { timeout: 50000 });
    cy.wait(2000);


    cy.log('Étape 8 : Vérification');
    cy.contains('Chargement...', { timeout: 30000 }).should('not.exist');
    
    cy.get('[data-cy="page-mes-reservations"]', { timeout: 30000 })
      .should('be.visible');
    
    cy.get('[data-cy="card-reservation"]', { timeout: 30000 })
      .should('have.length.greaterThan', 0);
    
    cy.wait(3000);

    cy.log('Parcours complet réussi !');
  });
});