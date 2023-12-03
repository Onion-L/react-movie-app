import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PlaylistAdd from "../components/cardIcons/playListAdd";

const UpcomingMoviesPage = (props) => {
  const { page, changePage } = useContext(MoviesContext);

  const handleChange = (event, value) => {
    changePage(value);
  };

  const { data, error, isLoading, isError } = useQuery(
    ["upcoming", { page: page }],
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const upcomingMovies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={upcomingMovies}
      changePage={handleChange}
      page={page}
      action={(movie) => {
        return <PlaylistAdd movie={movie} />;
      }}
    />
  );
};

export default UpcomingMoviesPage;
