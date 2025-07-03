/// <reference types="Cypress" />

describe("tasks manangment", () => {
  it("should open and close new task modal", () => {
    cy.visit("http://localhost:5174/");
    cy.get("button").contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");

    cy.get("button").contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5174/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get(".modal").contains("Add Task").click();

    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("New Task");
    cy.get(".task p").contains("Some description");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5174/");
    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5174/");
    cy.contains("Add Task").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("Some description");
    cy.get("#category").select("🚨 Urgent");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5174/");
    cy.contains("Add Task").click();
    cy.get("#title").type("Task1");
    cy.get("#summary").type("First task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.contains("Add Task").click();
    cy.get("#title").type("Task2");
    cy.get("#summary").type("Second task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 2);

    cy.get(".task").eq(0).contains("First task");
    cy.get(".task").eq(1).contains("Second task");
  });
});
