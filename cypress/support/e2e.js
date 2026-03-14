Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:8000/api/login",
    body: {
      email: "teste02@gmail.com",
      password: "Azerty2020",
    },
  }).then((response) => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", response.body.token);
      win.localStorage.setItem("user", JSON.stringify(response.body.user));
    });
  });
});
