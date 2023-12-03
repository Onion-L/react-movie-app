import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPersonDetail, getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import CreditList from "../components/creditList";
import img from "../images/film-poster-placeholder.png";

const PersonDetailPage = () => {
  const { id } = useParams();
  const {
    data: peopleDetail,
    isLoading: isPeopleLoading,
    isError: isPeopleError,
  } = useQuery(["people", { id: id }], getPersonDetail);

  const {
    data: movieCredits,
    isLoading: isMovieCreditsLoading,
    isError: isMovieCreditsError,
  } = useQuery(["combined_credits", { id: id }], getMovieCredits);

  if (isPeopleLoading || isMovieCreditsLoading) {
    return <Spinner />;
  }

  if (isPeopleError || isMovieCreditsError) {
    return <h1>Error fetch data...</h1>;
  }

  const people = peopleDetail;
  const { cast } = movieCredits;

  console.log(cast);
  return (
    <>
      <Grid container sx={{ marginTop: "20px" }} spacing={3}>
        <Grid item className="left_column" sx={{ width: "25%" }}>
          <img
            style={{ width: "300px", borderRadius: "10px" }}
            src={
              people.profile_path
                ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
                : img
            }
            alt={people.name}
          />
          <h3>Personal Info</h3>
          <section className="info-content">
            <strong>Known For</strong>
            <p>{people.known_for_department}</p>
            <strong>Birthday</strong>
            <p>{people.birthday}</p>
            <strong>Also Known As</strong>
            {people.also_known_as.length ? (
              people.also_known_as.map((aka, index) => {
                return <p key={index}>{aka}</p>;
              })
            ) : (
              <p>-</p>
            )}
          </section>
        </Grid>
        <Grid item className="right_column" sx={{ width: "75%" }}>
          <h2>{people.name}</h2>
          <h3>Biography</h3>
          {people.biography ? (
            people.biography.split(/\n\s*\n/).map((p) => {
              return <p>{p.trim()}</p>;
            })
          ) : (
            <p>We don't have a biography for Sang Woo.</p>
          )}
          <h3>Known For</h3>
          <CreditList credits={cast} endpoint="movies" />
        </Grid>
      </Grid>
    </>
  );
};

export default PersonDetailPage;
