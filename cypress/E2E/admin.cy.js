describe("Flow complet admin", () => {
  before(() => {
    cy.loginAdmin();
  });

  it("L admin peut voir le dashboard", () => {
    cy.url().should("include", "/admin/dashboard");
  });

  it("L admin peut naviguer vers les espaces", () => {
    cy.intercept("GET", "**/api/espaces*").as("getEspaces");
    cy.visit("http://localhost:5173/admin/espaces");
    cy.wait("@getEspaces", { timeout: 15000 });
    cy.url().should("include", "/admin/espaces");
  });

  it("L admin peut acceder au formulaire d ajout", () => {
    cy.contains("Ajouter").click();
    cy.url().should("include", "/admin/espaces/ajout");
  });

  it("L admin peut ajouter un espace", () => {
    cy.intercept("GET", "**/api/typeespaces*").as("getTypes");
    cy.visit("http://localhost:5173/admin/espaces/ajout");
    cy.wait("@getTypes", { timeout: 15000 });

    cy.get('input[name="nom"]', { timeout: 10000 })
      .should("be.visible")
      .type("Salle de test Cypress", { delay: 100 });

    cy.get('input[name="surface"]')
      .should("be.visible")
      .type("75", { delay: 100 });

    cy.get('select[name="id_type_espace"]', { timeout: 10000 })
      .should("be.visible")
      .find("option")
      .its("length")
      .should("be.greaterThan", 1);

    cy.get('select[name="id_type_espace"]').select(1);

    cy.get('input[name="prix_reservation"]')
      .should("be.visible")
      .type("50000", { delay: 100 });

    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/admin/espaces", { timeout: 10000 });
  });

  
});