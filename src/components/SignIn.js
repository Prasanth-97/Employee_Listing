//why callback is used
// round bracket is used

import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useFetch } from "../helper/useFetch";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const initialInputs = {
    username: "kminchelle",
    password: "0lelplR",
  };
  const [userInput, setUserInput] = useState(initialInputs);

  const { executeFetch, data, isPending } = useFetch(
    "https://dummyjson.com/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userInput.username,
        password: userInput.password,
      }),
    },
    { immediate: false }
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput((userInput) => ({ ...userInput, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await executeFetch();
  };

  if (data) {
    sessionStorage.setItem("token", data.token);
    navigate("/home");
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="outlined-basic"
            label="Username"
            type="text"
            name="username"
            variant="outlined"
            value={userInput.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userInput.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
