import { fetchData } from "../util/fetchData";

export const getMovies = async (page) => {
  return fetchData("discover/movie", page);
};

export const getMovie = async (id) => {
  return fetchData(`movie/${id}`);
};

export const getMovieImages = (id) => {
  return fetchData(`movie/${id}/images`);
};

export const getUpcomingMovies = async () => {
  return fetchData("movie/upcoming");
};

export const getGenres = async () => {
  return fetchData("genre/movie/list");
};

export const getLanguages = async () => {
  return fetchData("configuration/languages");
};

export const getLatestMovies = () => {
  return fetchData("movie/now_playing");
};

export const getMovieReviews = (id) => {
  return fetchData(`movie/${id}/reviews`);
};

export const getTrend = (page) => {
  return fetchData("trending/movie/day", page);
};

export const getPeople = () => {
  return fetchData("person/popular");
};

export const getPersonDetail = (id) => {
  return fetchData(`person/${id}`);
};

export const getCredits = (id) => {
  return fetchData(`movie/${id}/credits`);
};

export const getMovieCredits = (id) => {
  return fetchData(`person/${id}/movie_credits`);
};
