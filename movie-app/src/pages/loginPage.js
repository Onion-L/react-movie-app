import React, { useState, useEffect, useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { TextField, Button, Collapse } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const LoginPage = () => {
  const context = useContext(MoviesContext);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    favorites: context.favorites,
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    context.setIsAuthenticated(false);
    if (localStorage.getItem("user")) {
      localStorage.clear();
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(userInfo);
      if (result) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("favorites", JSON.stringify(result.favorites));
        context.setIsAuthenticated(true);
        const favorites = localStorage.getItem("favorites").split(",");
        context.updateFavorite(favorites);
        navigate("/");
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <Collapse in={error}>
        <Alert severity="error" id="error-alert">
          {errorMsg}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
        <Button
          name="register"
          onClick={handleRegister}
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
