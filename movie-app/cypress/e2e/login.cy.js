import "../support/commands";

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 15);
  const domain = "example.com";
  return `${randomString}@${domain}`;
}
/**
 * Test suite for the login functionality of the application.
 * This suite includes tests for various aspects of the login process.
 * @file
 */
describe("login page test", () => {
  before(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("allow user to log in", () => {
    cy.input("20095236@mail.wit.ie", "123456");
    cy.url().should("include", "/home");
  });
  describe("sign up test", () => {
    before(() => {
      cy.visit("http://localhost:3000/login");
    });
    it("allow user to sign up with email", () => {
      const randomEmail = generateRandomEmail();
      cy.get("button[name=register]").click();
      cy.input(randomEmail, "123456");
      cy.url().should("include", "/login");
    });
  });
  describe("log out test", () => {
    before(() => {
      cy.visit("/login");
      cy.input("20095236@mail.wit.ie", "123456");
    });
    it("Click log out and the sign in button will appear.", () => {
      cy.get("button[name=profile]").click();
      cy.get("li[name=logout]").click();
      cy.get("button[name=signin]").should("be.visible");
    });
  });
  describe("Error test", () => {
    before(() => {
      cy.visit("/register");
    });
    it("The error alert will appear if user doesn't input the right format of email", () => {
      cy.input("xxxxyyyy", "123456");
      cy.get("#error-alert").should("be.visible");
    });
  });
});
