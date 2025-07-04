/// <reference types="Cypress" />

describe("contact form", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should submit the form", () => {
    cy.getById("contact-input-message").type("hellooooo");
    cy.getById("contact-input-name").type("My Name");

    cy.getById("contact-btn-submit").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });

    cy.getById("contact-input-email").type("test@example.com{enter}");

    cy.getById("contact-btn-submit").as("submitBtn");
    cy.get("@submitBtn").contains("Send Message");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.getById("contact-btn-submit").click();
    cy.getById("contact-btn-submit").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.getById("contact-btn-submit").contains("Send Message");

    cy.getById("contact-input-message").as("msgInput");
    cy.get("@msgInput").blur();
    cy.get("@msgInput")
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
