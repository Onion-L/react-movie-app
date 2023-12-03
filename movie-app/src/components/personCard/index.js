import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const PersonCard = ({ people }) => {
  const titleList = people.known_for;

  return (
    <Link to={`/people/${people.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            sx={{ height: 314 }}
            image={`https://image.tmdb.org/t/p/w500/${people.profile_path}`}
            title="green iguana"
          />
          <CardContent sx={{ height: 90 }}>
            <Typography gutterBottom variant="h6" component="div">
              {people.name}
            </Typography>

            {titleList.map((title) => {
              return (
                (
                  <Typography variant="body2" color="text.secondary">
                    {title.original_title}
                  </Typography>
                ) || ""
              );
            })}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PersonCard;
