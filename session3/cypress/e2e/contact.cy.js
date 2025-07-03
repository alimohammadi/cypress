describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("[data-cy='contact-input-message']").type("hellooooo");
    cy.get("[data-cy='contact-input-name']").type("My Name");

    cy.get("[data-cy='contact-btn-submit']").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });

    cy.get("[data-cy='contact-input-email']").type("test@example.com{enter}");

    cy.get("[data-cy='contact-btn-submit']").as("submitBtn");
    cy.get("@submitBtn").contains("Send Message");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get("[data-cy='contact-btn-submit']").click();
    cy.get("[data-cy='contact-btn-submit']").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...")
    });
    cy.get("[data-cy='contact-btn-submit']").contains("Send Message");

    cy.get("[data-cy='contact-input-message']").blur()
    cy.get("[data-cy='contact-input-message']").parent().then(el=>{
        expect(el.attr("class")).to.contains("invalid")
    })
  });
});
