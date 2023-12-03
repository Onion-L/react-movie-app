let movies;
let cast;
let popular;
let movieCredits;
/**
 * Test suite for the navigation functionality of the application.
 * This suite checks the ability to navigate through different parts of the application.
 * @file
 */
describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        popular = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
        console.log("movies", movies);
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });

  describe("From movies details page to people page", () => {
    beforeEach(() => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }/credits?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          cast = response.cast;
        });
    });
    it("navigates to the people page and change browser URL", () => {
      cy.get(".MuiCard-root").eq(0).click();
      cy.url().should("include", `/people/${cast[0].id}`);
    });
  });
  describe("From people page to movie details page", () => {
    beforeEach(() => {
      cy.get("button").contains("People").click();
      cy.get(".MuiCard-root").eq(0).click();

      console.log("!!!", popular);
      cy.request(
        `https://api.themoviedb.org/3/person/${
          popular[0].id
        }/movie_credits?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          movieCredits = response.cast;
        });
    });
    it("navigates to the people page and change browser URL", () => {
      cy.get(".MuiCard-root").eq(0).click();
      cy.url().should("include", `/movies/${movieCredits[0].id}`);
    });
  });
});
