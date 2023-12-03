import React from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import { getMovieImages } from "../../api/tmdb-api";
import { getCredits } from "../../api/tmdb-api";
import CreditList from "../creditList/index";

const TemplateMoviePage = ({ movie, children }) => {
  const {
    data: movieImages,
    error: imageError,
    isLoading: isImageLoading,
    isError: isImageError,
  } = useQuery(["images", { id: movie.id }], getMovieImages);

  const {
    data: creditInfo,
    error: creditError,
    isLoading: isCreditLoading,
    isError: isCreditError,
  } = useQuery(["credits", { id: movie.id }], getCredits);

  if (imageError || isCreditError) {
    return <Spinner />;
  }

  if (isImageLoading || isCreditLoading) {
    return <h1>{isImageError.message}</h1> || <h1>{creditError.message}</h1>;
  }
  const images = movieImages.posters;
  const { cast } = creditInfo;
  if (images[0]) {
    console.log("111", images);
    return (
      <>
        <Grid
          container
          spacing={5}
          sx={{
            padding: "15px",
            backgroundColor: "#0d253f",
            marginTop: "10px",
          }}
        >
          <Grid item className="hidden-on-xs">
            <div
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${images[0].file_path}`}
                alt={images[0].poster_path}
                style={{ width: "300px", borderRadius: "10px" }}
              />
            </div>
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
        </Grid>
        <CreditList credits={cast} endpoint="people" />
      </>
    );
  } else {
    return <p>The Movie is not found</p>;
  }
};

export default TemplateMoviePage;
