Cypress.Commands.add("loginUser", () => {
  cy.intercept("POST", "**/api/login").as("loginRequest");
  cy.visit("http://localhost:5173/login");
  cy.get('input[name="email"]', { timeout: 10000 })
    .should("be.visible")
    .type("teste02@gmail.com", { delay: 100 });
  cy.get('input[name="password"]')
    .should("be.visible")
    .type("Azerty2020", { delay: 100 });
  cy.contains("button", "Se connecter").click();
  cy.wait("@loginRequest", { timeout: 15000 }).then((interception) => {
    const token = interception.response.body.token;
    const user = JSON.stringify(interception.response.body.user);
    cy.window().then((win) => {
      win.localStorage.setItem("token", token);
      win.localStorage.setItem("user", user);
    });
  });
  cy.url().should("include", "/accueil", { timeout: 15000 });
});

Cypress.Commands.add("loginAdmin", () => {
  cy.intercept("POST", "**/api/login").as("loginRequest");
  cy.visit("http://localhost:5173/login");
  cy.get('input[name="email"]', { timeout: 10000 })
    .should("be.visible")
    .type("johannorens009@gmail.com", { delay: 100 });
  cy.get('input[name="password"]')
    .should("be.visible")
    .type("Motdepasse99", { delay: 100 });
  cy.contains("button", "Se connecter").click();
  cy.wait("@loginRequest", { timeout: 15000 }).then((interception) => {
    const token = interception.response.body.token;
    const user = JSON.stringify(interception.response.body.user);
    cy.window().then((win) => {
      win.localStorage.setItem("token", token);
      win.localStorage.setItem("user", user);
    });
  });
  cy.url().should("include", "/admin/dashboard", { timeout: 15000 });
});