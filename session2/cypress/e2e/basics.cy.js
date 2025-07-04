/// <reference types="Cypress" />

describe("tasks page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5174/");
    cy.get(".main-header img");
  });

  it("should display the page title", () => {
    cy.visit("http://localhost:5174/");
    cy.get("h1").should("have.length", 1);
    cy.get("h1").contains("React Tasks");
  });
});
