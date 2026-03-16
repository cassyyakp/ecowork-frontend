describe("Flow complet utilisateur", () => {
  before(() => {
    cy.loginUser();
  });

  it("L utilisateur peut voir la page accueil", () => {
    cy.url().should("include", "/accueil");
  });

  it("L utilisateur peut naviguer vers les espaces", () => {
    cy.intercept("GET", "**/api/espaces*").as("getEspaces");
    cy.visit("http://localhost:5173/espaces");
    cy.wait("@getEspaces", { timeout: 15000 });
    cy.url().should("include", "/espaces");
  });

  it("L utilisateur peut voir le detail d un espace", () => {
    cy.intercept("GET", "**/api/espaces*").as("getEspaces");
    cy.visit("http://localhost:5173/espaces");
    cy.wait("@getEspaces", { timeout: 15000 });
    cy.get("div.cursor-pointer", { timeout: 10000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();
    cy.url().should("include", "/espaces/");
  });

  it("L utilisateur peut acceder au formulaire de reservation", () => {
    cy.intercept("GET", "**/api/espaces*").as("getEspaces");
    cy.visit("http://localhost:5173/espaces");
    cy.wait("@getEspaces", { timeout: 15000 });
    cy.get("div.cursor-pointer", { timeout: 10000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();
    cy.contains("Réserver", { timeout: 10000 }).click();
    cy.url().should("include", "/reservations/create/");
  });

  it("L utilisateur peut creer une reservation", () => {
    cy.intercept("GET", "**/api/espaces*").as("getEspaces");
    cy.visit("http://localhost:5173/espaces");
    cy.wait("@getEspaces", { timeout: 15000 });
    cy.get("div.cursor-pointer", { timeout: 10000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();
    cy.contains("Réserver", { timeout: 10000 }).click();
    cy.get('input[name="date_debut"]', { timeout: 10000 })
      .should("be.visible")
      .type("2026-05-01", { delay: 100 });
    cy.get('input[name="date_fin"]')
      .should("be.visible")
      .type("2026-05-05", { delay: 100 });
    cy.get('select[name="mode_paiement"]').select("totalite");
    cy.contains("Réserver").click();
    cy.url().should("include", "/reservations", { timeout: 10000 });
  });

  it("L utilisateur peut voir ses reservations", () => {
    cy.visit("http://localhost:5173/reservations");
    cy.url().should("include", "/reservations");
    cy.contains("Réservations", { timeout: 5000 }).should("be.visible");
  });
}); 