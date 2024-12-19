import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "./Spotify_Full_Logo_RGB_Green.png";
import Login from "./Login";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  const name = JSON.parse(localStorage.getItem("loggedIn_User"));
  console.log(name.username);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) return <Login />;

  return (
    <AppBar position="static" sx={{ bgcolor: "inherit", boxShadow: "none" }}>
      <Toolbar>
        {/* Logo */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 50, mr: 2 }} />

        {/* Spacer to push right-aligned content */}
        <Box sx={{ flexGrow: 1 }} />

        {/* User Avatar and Logout */}
        <Avatar sx={{ bgcolor: "green", mr: 2 }}>Op</Avatar>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
          <Typography sx={{ ml: 1, fontSize: 15 }}>Logout</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Home;
