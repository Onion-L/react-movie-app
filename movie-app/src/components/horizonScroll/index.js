import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const HorizontalScroll = ({ contents }) => {
  return (
    <Box
      sx={{
        overflowX: "auto",
        display: "flex",
        flexDirection: "row",
        padding: "20px",
      }}
    >
      {contents.map((movie, index) => (
        <Card key={index} sx={{ minWidth: "160px", marginRight: "20px" }}>
          <CardMedia component="img" image={movie.imageUrl} alt={movie.title} />
          <Typography variant="subtitle1" component="div">
            {movie.title}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default HorizontalScroll;
