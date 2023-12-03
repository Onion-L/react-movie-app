import React from "react";
import Paper from "@mui/material/Paper";
import MediaCard from "../creditCard";

const scroll = {
  display: "flex",
  flexWrap: "noWrap",
  listStyle: "none",
  padding: 0,
  overflowY: "hidden",
  overflowX: "scroll",
};

const CreditList = ({ credits, endpoint }) => {
  return (
    <div>
      <Paper component="ul" sx={{ ...scroll }}>
        {credits.slice(0, 10).map((c) => {
          return (
            <li key={c.id}>
              <MediaCard cast={c} endpoint={endpoint} />
            </li>
          );
        })}
      </Paper>
    </div>
  );
};

export default CreditList;
