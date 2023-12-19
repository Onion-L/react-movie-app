# Assignment 1 - React Movie App

Name: Xiang Li 20095236

## Overview

 A web application that provides users with comprehensive information about movies, including details on specific movies, trending movies, latest movies, and movie genres. It also includes functionalities for user authentication and profile management. The page layout has been changed.

### Features

+ Home Page: Displays a list of movies.
+ Latest Movies Page: Shows the latest movies.
+ Login Page: Allows users to log in to the application.
+ Movie Details Page: Provides detailed information about a specific movie.
+ Person Detail Page: Displays detailed information about a specific actor.
+ Person Page: Lists popular actors.
+ Search Page: The results of the search are displayed on this page.
+ Add Movie Review Page: Allows users to add reviews for movies.
+ Favorite Movies Page: Users can view and manage their list of favorite movies.
+ Movie Review Page: Displays user reviews for specific movies.
+ Trending Movies Page: Showcases movies that are trending.
+ Upcoming Movies Page: Lists movies that are upcoming.

## functionality

1. Jump between movie detail and people detail pages
2. Search by the name of movies
3. Filter movies by language and genre
4. User login function
5. pagination

## Setup requirements

+ Clone the repository: git clone '<https://github.com/Onion-L/react-movie-labs.git>'
+ Navigate to the project directory: cd movies
+ Install dependencies: npm install
+ Start the application: npm start

## API endpoints

The application uses additional TMDB endpoints including:

+ Discover list of movies - `GET /discover/movie`
+ Movie details - `GET /movie/:id`
+ Movie genres - `GET /genre/movie/list`
+ Person details - `GET /person/:id`
+ Search movies - `GET /search/movie`
+ Trending movies - `GET /trending/movie/day`
+ Upcoming movies - `GET /movie/upcoming`
+ Languages - `GET /configuration/languages`
+ movie credits - `GET /movie/:id/credits`
+ person credits - `GET /person/:id/movie_credits`

## Routing

The application supports several new routes:

+ `/home` - displays the home page with trending movies.
+ `/movies/latest` - displays the latest movies.
+ `/movies/upcoming` - shows upcoming movie releases.
+ `/movies/:id` - displays detailed information about a specific movie.
+ `/person/:id` - displays detailed information about a specific person in the movie industry.
+ `/search` - allows users to search for movies and persons.

Protected routes (require user authentication):

+ `/movies/favorites` - displays a user's favorite movies.

## Independent learning

This project includes the following technologies and techniques not covered in lectures:

+ Material-UI for modern, responsive UI components.
+ Encapsulate router paths as an array of objects
+ Encapsulate api requests into two functions: fetchData and fetchPageData

References:

+ [Firebase Documentation](https://firebase.google.com/docs)
+ [Cypress.io Docs](https://docs.cypress.io)
+ [Material-UI Documentation](https://material-ui.com/)

![Alt text](./assets/image.png)

![Alt text](./assets/image-1.png)

![Alt text](./assets/image-2.png)
