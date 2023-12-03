import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTrend } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const TrendMoviesPage = (props) => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, error, isLoading, isError } = useQuery(
    ["trend", { page }],
    getTrend
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const trendMovies = data.results;
  const { vote_average } = trendMovies[3];
  console.log(trendMovies[1].popularity, vote_average);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={trendMovies}
      changePage={handleChange}
      action={() => {
        return null;
      }}
    />
  );
};

export default TrendMoviesPage;
