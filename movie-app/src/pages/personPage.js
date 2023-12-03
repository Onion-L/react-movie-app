import React from "react";
import { getPeople } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PersonList from "../components/personList";
import Grid from "@mui/material/Grid";

const PersonPage = () => {
  const { data, error, isLoading, isError } = useQuery(
    ["people", { page: 1 }],
    getPeople
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const people = data.results;

  console.log(people[0]);

  return (
    <>
      <Grid container sx={{ padding: "20px" }}>
        <Grid item container spacing={6}>
          <PersonList people={people}></PersonList>
        </Grid>
      </Grid>
    </>
  );
};
export default PersonPage;
