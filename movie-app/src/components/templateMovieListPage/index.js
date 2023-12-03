import React, { useState, useEffect } from "react";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import FilterTask from "../filterTask";

function MovieListPageTemplate({ movies, title, action, page, changePage }) {
  const [genreFilter, setGenreFilter] = useState("0");
  const [langFilter, setLangFilter] = useState(" ");
  const [displayedMovies, setDisplayedMovies] = useState(movies);
  const genreId = Number(genreFilter);

  useEffect(() => {
    let newMovies = movies
      .filter((m) => {
        return genreId > 0 ? m.genre_ids.includes(genreId) : true;
      })
      .filter((m) => {
        return langFilter !== " " ? m.original_language === langFilter : true;
      });

    setDisplayedMovies(newMovies);
    // eslint-disable-next-line
  }, [langFilter, genreFilter]);

  const handleFilterChange = (type, value) => {
    if (type === "genres") setGenreFilter(value);
    else setLangFilter(value);
  };

  return (
    <>
      <FilterTask changeFilter={handleFilterChange} />
      <Grid container sx={{ padding: "20px" }}>
        <Grid item container spacing={6}>
          <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Pagination
            count={100}
            color="primary"
            page={page}
            onChange={changePage}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default MovieListPageTemplate;
