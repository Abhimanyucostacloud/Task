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
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [isLogin, setisLogin] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  const name = JSON.parse(localStorage.getItem("loggedIn_User"));
  const letter = name.username.substring(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setisLogin(false);
    navigate("/login");
  };

  // if (!isAuthenticated) return <Login />;

  return (
    <AppBar position="static" sx={{ bgcolor: "inherit", boxShadow: "none" }}>
      <Toolbar>
        {/* Logo */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 50, mr: 2 }} />

        {/* Spacer to push right-aligned content */}
        <Box sx={{ flexGrow: 1 }} />

        {/* User Avatar and Logout */}
        <Avatar sx={{ bgcolor: "green", mr: 2 }}>{letter}</Avatar>
        <IconButton onClick={handleLogout} sx={{ color: "black" }}>
          <LogoutIcon />
          <Typography sx={{ ml: 1, fontSize: 15 }}>Logout</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Home;
