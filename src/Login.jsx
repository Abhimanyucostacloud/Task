import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "20px",
  backgroundColor: "#b0d6e2",
});

const CardWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  width: "100%",
});

const Card = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden",
  width: "900px",
  maxWidth: "100%",
  height: "50vh",
  position: "relative",
  border: "2px solid orange",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "auto",
  },
}));

const Panel = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 30px",
  backgroundColor: "#f0f4f7",
  border: "2px solid orange",
  [theme.breakpoints.down("sm")]: {
    padding: "15px",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "15px",
  "& .MuiInputBase-root": {
    backgroundColor: "#fff",
    height: "40px",
    padding: "0 14px",
    fontSize: "14px",
  },
  width: "300px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const SubmitButton = styled(Button)({
  backgroundColor: "#f38337",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#e3722a",
  },
  fontWeight: "bold",
  marginTop: "20px", // Adds spacing between card and button
  width: "200px",
});

const Icon = styled(LockIcon)(({ theme }) => ({
  backgroundColor: "orange",
  color: "white",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  [theme.breakpoints.down("sm")]: {
    top: "42%",
  },
}));

const Login = () => {
  let navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [signupInputs, setSignupInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isLoginDisabled = Object.values(signupInputs).some(
    (value) => value.trim() !== ""
  );

  const isSignupDisabled = Object.values(loginInputs).some(
    (value) => value.trim() !== ""
  );

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginDisabled) {
      // Sign Up Workflow
      if (
        signupInputs.username.trim() &&
        signupInputs.email.trim() &&
        signupInputs.password.trim()
      ) {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const isExistingUser = existingUsers.some(
          (user) => user.email === signupInputs.email
        );

        if (isExistingUser) {
          toast.error("User Already Exists!!");
        } else {
          // Add new user
          const newUser = { ...signupInputs };
          existingUsers.push(newUser);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          toast.success("Sign Up Successful !!");
          setSignupInputs({ username: "", email: "", password: "" });
        }
      } else {
        toast.error("Please fill in all Sign Up details!");
      }
    } else if (isSignupDisabled) {
      // Log In Workflow
      if (loginInputs.email.trim() && loginInputs.password.trim()) {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = existingUsers.find(
          (u) =>
            u.email === loginInputs.email && u.password === loginInputs.password
        );

        if (user) {
          // Generate token
          const userUUID = uuidv4();
          const token = btoa(`${user.password}${userUUID}`);
          const loggedInUser = {
            username: user.username,
            email: user.email,
            token: token,
          };

          // Save user details with token to localStorage
          localStorage.setItem("authToken", token);
          localStorage.setItem("loggedIn_User", JSON.stringify(loggedInUser));

          navigate("/home");
          setLoginInputs({ email: "", password: "" });
        } else {
          toast.error("Invalid Email or Password!");
        }
      } else {
        toast.error("Please fill in all Login details!");
      }
    } else {
      toast.error("Please fill in the appropriate form to continue.");
    }
  };

  return (
    <Container>
      <CardWrapper>
        {/* Card with Login & Signup Panels */}
        <Card>
          {/* Login Panel */}
          <Panel>
            <Typography variant="h5" align="center" mb={2}>
              Log In
            </Typography>
            <StyledTextField
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={loginInputs.email}
              onChange={handleLoginChange}
              disabled={isLoginDisabled}
            />
            <StyledTextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={loginInputs.password}
              onChange={handleLoginChange}
              disabled={isLoginDisabled}
            />
          </Panel>
          {/* Middle Lock Icon */}
          <Icon />
          {/* Signup Panel */}
          <Panel>
            <Typography variant="h5" align="center" mb={2}>
              Sign Up
            </Typography>
            <StyledTextField
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={signupInputs.username}
              onChange={handleSignupChange}
              disabled={isSignupDisabled}
            />
            <StyledTextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={signupInputs.email}
              onChange={handleSignupChange}
              disabled={isSignupDisabled}
            />
            <StyledTextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={signupInputs.password}
              onChange={handleSignupChange}
              disabled={isSignupDisabled}
            />
          </Panel>
        </Card>
        {/* Submit Button Directly Below the Card */}
        <SubmitButton variant="contained" onClick={handleSubmit}>
          SUBMIT
        </SubmitButton>
      </CardWrapper>
    </Container>
  );
};

export default Login;
