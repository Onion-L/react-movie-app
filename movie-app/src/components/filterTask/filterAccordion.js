import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

const FilterAccordion = ({
  genres,
  languages,
  handleGenreChange,
  handleLangChange,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <hr />
        <Typography>Genres</Typography>

        {genres.map((genre) => {
          return (
            <Button
              name="genres-btn"
              key={genre.id}
              value={genre.id}
              size="small"
              variant="elevated"
              color="primary"
              onClick={handleGenreChange}
            >
              {genre.name}
            </Button>
          );
        })}
        <hr />
        <Typography>Languages</Typography>
        {languages
          .filter((lang) => {
            return lang.name !== "" && !lang.name.includes("?");
          })
          .map((lang) => {
            return (
              <Button
                name="lang-btn"
                key={lang.iso_639_1}
                value={lang.iso_639_1}
                size="small"
                variant="elevated"
                color="primary"
                onClick={handleLangChange}
              >
                {lang.name}
              </Button>
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
