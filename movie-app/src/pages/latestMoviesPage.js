import React, { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import { getLatestMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const LatestMoviesPage = () => {
  const { page, changePage } = useContext(MoviesContext);

  useEffect(() => {
    changePage(1);
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, value) => {
    changePage(value);
  };

  const {
    data: latestMovies,
    isLoading: islatestMoviesLoading,
    isError: islatestMoviesError,
  } = useQuery(["latest", { page }], getLatestMovies);

  if (islatestMoviesLoading) {
    return <Spinner />;
  }

  if (islatestMoviesError) {
    return <h1>Error</h1>;
  }

  const movies = latestMovies.results;

  return (
    <>
      <PageTemplate
        movies={movies}
        changePage={handleChange}
        page={page}
        action={() => {
          return null;
        }}
      />
    </>
  );
};

export default LatestMoviesPage;
