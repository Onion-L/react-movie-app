import React from "react";
import PersonCard from "../personCard";
import Grid from "@mui/material/Grid";

const PersonList = ({ people }) => {
  let personCards = people.map((p) => (
    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
      <PersonCard key={p.id} people={p} />
    </Grid>
  ));
  return personCards;
};

export default PersonList;
