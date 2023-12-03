import React, { useState, useContext, useEffect } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import SearchBar from "../components/searchBar";

const HomePage = () => {
  const { page, changePage } = useContext(MoviesContext);

  useEffect(() => {
    changePage(1);
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, value) => {
    changePage(value);
  };
  const [nameFilter, setNameFilter] = useState("");

  const { data, error, isLoading, isError } = useQuery(
    ["discover", { page: page }],
    getMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;
  const handleSearchChange = (value) => {
    setNameFilter(value);
  };

  return (
    <>
      <SearchBar titleFilter={nameFilter} onUserInput={handleSearchChange} />
      <PageTemplate
        movies={movies}
        changePage={handleChange}
        page={page}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
    </>
  );
};
export default HomePage;
