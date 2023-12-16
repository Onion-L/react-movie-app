import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      console.error("Error:", error);
    });
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const auth = getAuth();
    // try {
    //   await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error:", error.message);
    // }

    console.log(userInfo);
    axiosInstance
      .post("/api/users", userInfo)
      .then((res) => {
        //token
        const TOKEN = res.data.token.split(" ")[1];
        console.log("ttt", TOKEN);
        localStorage.setItem("user", userInfo.username);
        navigate("/");
      })
      .catch((e) => {
        console.log(e.msg);
      });
  };

  return (
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
  );
};

export default LoginPage;
