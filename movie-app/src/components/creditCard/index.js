import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import img from "../../images/film-poster-placeholder.png";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function MediaCard({ endpoint, cast }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${endpoint}/${cast.id}`);
  };
  return (
    <Card
      sx={{ width: 191, height: 320, margin: "10px 10px" }}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia
          sx={{ height: 220 }}
          image={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w300/${cast.profile_path}`
              : cast.poster_path
              ? `https://image.tmdb.org/t/p/w300/${cast.poster_path}`
              : img
          }
          title="green iguana"
        />
        <CardContent>
          <Typography
            sx={{
              fontWeight: 700,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: "3em",
            }}
          >
            {cast.name || cast.title}
          </Typography>
          <Typography> {cast.character || ""}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
