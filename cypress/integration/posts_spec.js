describe("Autofy E2E Test", () => {
  it("Visit home page", () => {
    cy.visit("/");

    cy.get(".MuiCard-root").first().as("first-event").click();
    cy.url().should("include", "/1");
    cy.get('[data-test-id="header-title"]').should("to.have.text", "Comments");
    cy.get('[data-test-id="back-button"]').as("second-event").should("have.text", "Back");
    cy.get("@second-event").click();

    cy.get(".MuiCard-root").eq(1).as("third-event").click();
    cy.url().should("include", "/2");
    cy.get("@third-event").click();
    cy.get('input[type="email"]').type("cytest@test.biz");
    cy.get('input[type="text"]').type("cytester");
    cy.get("textarea").type("cy testing comment");
    cy.get('[data-test-id="add-comment"]').as("fourth-event");
    cy.get("@fourth-event").click();

    cy.get(".MuiCard-root").eq(5).as("fifth-event");
    cy.get("@fifth-event").find(".MuiTypography-root").first().should("to.have.text", "cytester");
    cy.get("@fifth-event")
      .find(".MuiTypography-root")
      .eq(1)
      .should("to.have.text", "cy testing comment");
    cy.get("@fifth-event")
      .find(".MuiTypography-root")
      .eq(2)
      .should("to.have.text", "cytest@test.biz");
  });
});
