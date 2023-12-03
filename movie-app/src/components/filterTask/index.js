import React, { useState } from "react";
import { getGenres, getLanguages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Fab from "@mui/material/Fab";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Drawer from "@mui/material/Drawer";
import { Grid } from "@mui/material";
import Spinner from "../spinner";
import FilterAccordion from "./filterAccordion";

const FilterTask = ({ changeFilter, handleSortChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    data: gneresList,
    isLoading: isGenreLoading,
    isError: isGenreError,
  } = useQuery("genres", getGenres);

  const {
    data: languagesList,
    isLoading: isLanLoading,
    isError: isLanError,
  } = useQuery("languages", getLanguages);

  if (isLanLoading || isGenreLoading) {
    return <Spinner />;
  }

  if (isLanError || isGenreError) {
    return <h1>Error</h1>;
  }

  const genres = gneresList.genres;
  const languages = languagesList;

  const handleLangChange = (e) => {
    changeFilter("lang", e.target.value);
  };
  const handleGenreChange = (e) => {
    changeFilter("genres", e.target.value);
  };

  return (
    <>
      <Fab
        name="filter-btn"
        color="primary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <FilterAltIcon />
      </Fab>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Grid
          container
          spacing={2}
          sx={{ width: "30vw", justifyContent: "center", paddingTop: 5 }}
        >
          <Grid item sx={{ width: "80%" }}>
            <FilterAccordion
              genres={genres}
              languages={languages}
              handleGenreChange={handleGenreChange}
              handleLangChange={handleLangChange}
            />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};
export default FilterTask;
