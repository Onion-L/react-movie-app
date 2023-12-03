import { fetchData, fetchPageData } from "../utils/fetch";

export const getMovies = (args) => {
  const [, idPart] = args.queryKey;
  const { page } = idPart;
  return fetchPageData("discover/movie", page);
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetchData(`movie/${id}`);
};

export const getGenres = async () => {
  return fetchData("genre/movie/list");
};

export const getLanguages = async () => {
  return fetchData("configuration/languages");
};

export const getLatestMovies = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { page } = idPart;
  return fetchPageData("movie/now_playing", page);
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchData(`movie/${id}/images`);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchData(`movie/${id}/reviews`);
};

export const getUpcomingMovies = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { page } = idPart;
  return fetchPageData("movie/upcoming", page);
};

export const getTrend = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { page } = idPart;
  return fetchPageData("trending/movie/day", page);
};

export const getPeople = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { page } = idPart;
  return fetchPageData("person/popular", page);
};

export const getPersonDetail = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchData(`person/${id}`);
};

export const getCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchData(`movie/${id}/credits`);
};

export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchData(`person/${id}/movie_credits`);
};
