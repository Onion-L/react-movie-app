import React, { useState } from "react";
import { getCredits } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "nowrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, error, isLoading, isError } = useQuery(
    ["credits", { id: movie.id }],
    getCredits
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const { cast } = data;

  console.log(cast);

  if (!movie || !movie.genres) {
    return (
      <Typography variant="h6" component="h2">
        Movie details are not available.
      </Typography>
    );
  } else {
    return (
      <>
        <Typography variant="h4" component="h2" style={{ color: "#fff" }}>
          {movie.original_title}
        </Typography>
        <Typography
          variant="p"
          component="p"
          style={{ color: "rgb(128,128,128)" }}
        >
          {movie.tagline}
        </Typography>
        <Typography variant="h5" component="h3" style={{ color: "#fff" }}>
          Overview
        </Typography>

        <Typography variant="p" component="p" style={{ color: "#fff" }}>
          {movie.overview}
        </Typography>

        <Paper component="ul" sx={{ ...root, marginTop: "20px" }}>
          <li>
            <Chip label="Genres" sx={{ ...chip }} color="primary" />
          </li>
        </Paper>
        <Paper component="ul" sx={{ ...root }}>
          <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
          />
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count}`}
          />
          <Chip label={`Released: ${movie.release_date}`} />
        </Paper>
        <Paper component="ul" sx={{ ...root }}>
          <Chip label={"Production Countries"} color="primary" />
          {movie.production_countries[0] ? (
            <Chip label={`${movie.production_countries[0].name}`} />
          ) : (
            <span></span>
          )}
        </Paper>
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            bottom: "1em",
            right: "1em",
          }}
        >
          <NavigationIcon />
          Reviews
        </Fab>
        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <MovieReviews movie={movie} />
        </Drawer>
      </>
    );
  }
};
export default MovieDetails;
