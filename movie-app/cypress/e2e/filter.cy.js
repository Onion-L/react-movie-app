import { filterByGenre, filterByTitle, filterByLanguage } from "../support/e2e";
import "../support/commands";
let movies;

/**
 * Test suite for filtering functionality in a movie application.
 * Includes tests for filtering by title, genre, and language.
 * @file
 */
describe("Filtering", () => {
  before(() => {
    // Get movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
        console.log(movies);
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });
  /**
   * Test suite for filtering movies by title.
   */
  describe("By movie title", () => {
    /**
     * Test to verify that filtering by a specific letter 'm' in the movie title
     * displays only the movies with that letter in their titles.
     */
    it("only display movies with 'm' in the title", () => {
      const searchString = "m";
      const matchingMovies = filterByTitle(movies, searchString);
      console.log(matchingMovies);
      cy.search(searchString);
      cy.url().should("include", "/search");
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );

      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
    /**
     * Test to verify the behavior when no movie titles match the search filter.
     * It checks if the application correctly handles and displays no results.
     */
    it("handles case when there are no matches", () => {
      const searchString = "xyxxzyyzz";
      cy.search(searchString);
      cy.get(".MuiCardHeader-content").should("have.length", 0);
    });
  });
  /**
   * Test suite for filtering movies by genre.
   */
  describe("By movie genre", () => {
    /**
     * Test to verify that filtering by a specific genre (e.g., Drama)
     * displays only the movies of that genre.
     */
    it("show movies with the selected genre", () => {
      const selectedGenreId = 18;
      const selectedGenreText = "Drama";
      const matchingMovies = filterByGenre(movies, selectedGenreId);
      cy.get("button[name=filter-btn]").click();
      cy.get("#panel2a-header").click();
      cy.get("button[name=genres-btn]").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
  });
  /**
   * Test suite for filtering movies by language.
   */
  describe("By movie language", () => {
    /**
     * Test to verify that filtering by a specific language (e.g., English)
     * displays only the movies in that language.
     */
    it("show movies with the selected genre", () => {
      const selectedlangIso = "en";
      const selectedGenreText = "English";
      const matchingMovies = filterByLanguage(movies, selectedlangIso);
      cy.get("button[name=filter-btn]").click();
      cy.get("#panel2a-header").click();
      cy.get("button[name=lang-btn]").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
  });
});
