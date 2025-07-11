/// <reference types="cypress" />

describe("Newsletter", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });

  it("should display success message", () => {
    cy.intercept("POST", "/newsletter*", {
      status: 201,
    }).as("subscribe"); //intercept any http request localhost:3000/newsletter?anything

    cy.visit("/");
    cy.get("[data-cy='newsletter-email']").type("test@example.com");
    cy.get("[data-cy='newsletter-submit']").click();
    cy.wait("@subscribe");

    cy.contains("Thans for signing up");
  });

  it("should display validation error", () => {
    cy.intercept("POST", "/newsletter*", {
      message: "Email exists already.",
    }).as("subscribe"); //intercept any http request localhost:3000/newsletter?anything

    cy.visit("/");
    cy.get("[data-cy='newsletter-email']").type("test@example.com");
    cy.get("[data-cy='newsletter-submit']").click();
    cy.wait("@subscribe");

    cy.contains("Email exists already.");
  });

  it("should successfully create a new contact", () => {
    cy.request({
      method: "POST",
      url: "/newsletter",
      body: {
        email: "test@example.com",
      },
      form: true,
    }).then((res) => expect(res.status).to.eq(201));
  });
});
