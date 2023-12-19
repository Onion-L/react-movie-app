# Assignment 2 - Web API

__Name:__ Xiang Li 20095236

## Features

+ __Movies Genres:__ The database stores the genre data of movies, and implements the movie genre interface.
+ __Movies Languages:__ The movie language related data is stored in the database, and the language acquisition interface is implemented.
+ __Movies Service:__ Handles various requests related to movies, integrates tmdb data acquisition function (e.g., movies, actors, credits detail, etc.)
+ __Favorites:__ The favorites array is added to the user schema to store the favorites information of different users.

## Setup requirements

Clone the repository: git clone <https://github.com/Onion-L/react-movie-app.git>
Install dependencies: npm install
Initialise the database: npm run dev
Start the application: npm run start

## API Configuration

Creating the ".env" file

>NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=MONGO_DB_URL
TMDB_KEY=TMDB_KEY
SECRET=JWT_SECRET_KEY

## API Design

![api design](image.png)

## Security and Authentication

+ movieRouter:Authentication is required before getting data from movieRouter.

## Integrating with React App

To better organize and manage requests related to TMDB data, we have created a service called movieService and set up a router to ensure that all API interactions go through the backend, rather than the frontend directly requesting the TMDB API. This approach helps improve code maintainability and security while allowing us to perform proper authorization and data processing on the backend to meet the frontend's needs. This layered architecture also helps segregate responsibilities between the frontend and backend, making the system more robust and scalable.

![movieService](image-1.png)

## Independent learning (if relevant)

+ __axios:__ The frontend has replaced Fetch with Axios for requests, enhancing functionality and code maintainability.
+ __Swagger:__ Use Swagger to automatically generate API documentation to improve API usability, understandability, and development efficiency.
