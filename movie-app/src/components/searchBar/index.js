import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const searchWrap = {
  width: "98%",
  height: "234px",
  backgroundColor: "#0d253f",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "@media (maxWidth: 600px)": {
    height: "200px",
  },
  "@media (maxWidth: 768px)": {
    height: "220px",
  },
};

const SearchBar = ({ titleFilter, onUserInput }) => {
  let navigate = useNavigate();

  const handleSearch = () => {
    if (titleFilter) {
      navigate(`/search?query=${titleFilter}`);
    }
  };
  const handleTextChange = (e) => {
    e.preventDefault();
    onUserInput(e.target.value);
  };

  return (
    <div className="search_wrapper" style={{ ...searchWrap }}>
      <h2 style={{ color: "#fff", marginLeft: "22px" }}>
        Welcome to our exciting world of movies and entertainment!
      </h2>
      <div
        className="input_wrapper"
        style={{
          display: "flex",
          height: "46px",
          width: "95%",
          borderRadius: "30px",
          backgroundColor: "#fff",
          margin: "0 auto",
        }}
      >
        <input
          id="filter-search"
          type="text"
          style={{
            height: "38px",
            width: "90%",
            border: "0",
            marginLeft: "16px",
            marginTop: "2px",
            outline: "none",
          }}
          value={titleFilter}
          placeholder="Search for a movie or people..."
          onChange={handleTextChange}
        />
        <Button
          name="search-btn"
          variant="contained"
          color="success"
          onClick={handleSearch}
          sx={{
            height: "100%",
            width: "8%",
            marginLeft: "7px",
            borderRadius: "30px",
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
