import React, { useState } from "react";
import { ManageFavoriteMovie } from "../api/uploader";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const userId = localStorage.getItem("userId");
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);
  const [page, setPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(userId));

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
      ManageFavoriteMovie(newFavorites);
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    const newFavorites = favorites.filter((mId) => mId !== movie.id);
    setFavorites(newFavorites);
    ManageFavoriteMovie(newFavorites);
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch = [...mustWatch, movie.id];
    } else {
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        page,
        isAuthenticated,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch,
        changePage,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
