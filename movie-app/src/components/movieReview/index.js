import React from "react";
import Typography from "@mui/material/Typography";

const MovieReview = ({ review }) => {
  return (
    <>
      <Typography variant="h5" component="h3" color={"#fff"}>
        Review By: {review.author}
      </Typography>
      <hr />
      <Typography variant="h6" component="p" color={"#fff"}>
        {review.content}
      </Typography>
    </>
  );
};
export default MovieReview;
