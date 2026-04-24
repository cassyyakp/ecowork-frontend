describe("Flow complet utilisateur", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/accueil");
    cy.login();
    cy.wait(1500);
    cy.visit("http://localhost:5173/accueil");
    cy.wait(1500);
  });

  it("L utilisateur peut voir la page accueil", () => {
    cy.url().should("include", "/accueil");
  });

  it("L utilisateur peut naviguer vers les espaces", () => {
    cy.contains("Espaces").click();
    cy.wait(1000);
    cy.url().should("include", "/espaces");
  });

  it("L utilisateur peut voir le detail d un espace", () => {
    cy.visit("http://localhost:5173/espaces");
    cy.wait(3000);
    cy.get("div.cursor-pointer").first().click();
    cy.wait(2000);
    cy.url().should("include", "/espaces/");
  });

  it("L utilisateur peut acceder au formulaire de reservation", () => {
    cy.visit("http://localhost:5173/espaces");
    cy.wait(3000);
    cy.get("div.cursor-pointer").first().click();
    cy.wait(2000);
    cy.contains("Réserver").click();
    cy.wait(1500);
    cy.url().should("include", "/reservations/create/");
  });

  it("L utilisateur peut creer une reservation", () => {
    cy.visit("http://localhost:5173/espaces");
    cy.wait(3000);
    cy.get("div.cursor-pointer").first().click();
    cy.wait(2000);
    cy.contains("Réserver").click();
    cy.wait(1500);
    cy.get('input[name="date_debut"]').type("2026-05-01");
    cy.wait(500);
    cy.get('input[name="date_fin"]').type("2026-05-05");
    cy.wait(500);
    cy.get('select[name="mode_paiement"]').select("totalite");
    cy.wait(500);
    cy.contains("Réserver").click();
    cy.wait(2000);
    cy.url().should("include", "/reservations");
  });

  it("L utilisateur peut voir ses reservations", () => {
    cy.contains("Réservations").click();
    cy.wait(1000);
    cy.url().should("include", "/reservations");
  });
});
