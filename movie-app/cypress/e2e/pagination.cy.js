/**
 * Test suite for the pagination functionality of the application.
 * This suite includes tests for the correct functioning of pagination controls.
 * @file
 */
describe("Pagination Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should navigate to the next page", () => {
    cy.get('button[aria-label="Go to next page"]').click();
    cy.get(".MuiCardHeader-content").should("have.length", 20);
  });

  it("should navigate to a specific page when page number is clicked", () => {
    cy.get("button[aria-label='Go to page 5']").click();
    cy.get(".MuiCardHeader-content").should("have.length", 20);
  });

  it("should not navigate to the previous page when on the first page", () => {
    cy.get('button[aria-label="Go to previous page"]').should("be.disabled");
  });
});
