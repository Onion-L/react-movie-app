import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { TextField, Button, Collapse } from "@mui/material";
import Alert from "@mui/material/Alert";

const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await signup(userInfo);
      if (response.success) {
        navigate("/login");
      } else {
        throw new Error(response.msg);
      }
    } catch (error) {
      setError(true);
      console.error("Register Error:", error.message);
    }
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <Collapse in={error}>
        <Alert severity="error" id="error-alert">
          Please enter the right email address
        </Alert>
      </Collapse>
      <form onSubmit={handleRegister}>
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
        <Button
          name="register"
          type="submit"
          onClick={handleRegister}
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
