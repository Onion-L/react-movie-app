import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Spinner from "../components/spinner";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  let location = useLocation();
  let param = location.search;

  const { data, error, isLoading, isError } = useQuery(
    ["discover", { page: 1 }],
    getMovies
  );
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  let movies = data.results;
  let searchWord = param.split("=")[1];
  let displayedMovies = movies.filter((m) => {
    return m.title.toLowerCase().search(searchWord.toLowerCase()) !== -1;
  });

  return (
    <PageTemplate
      movies={displayedMovies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default SearchPage;
