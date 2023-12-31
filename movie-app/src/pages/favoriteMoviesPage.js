import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import { useQueries } from "react-query";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);
  console.log(movieIds);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
