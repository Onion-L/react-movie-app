import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Collapse } from "@mui/material";
import Alert from "@mui/material/Alert";

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    setError(false);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (validateEmail(user.email)) {
          navigate("/login");
        } else {
          throw new Error("Please enter the right email address");
        }
      })
      .catch((error) => {
        setError(true);
        console.error("Register Error:", error.message);
      });
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
          label="email"
          variant="outlined"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
