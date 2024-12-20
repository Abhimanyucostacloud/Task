import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    Boolean(localStorage.getItem("authToken"))
  );

  const user = JSON.parse(localStorage.getItem("loggedIn_User") || "{}");
  const letter = user?.username?.substring(0, 2).toUpperCase() || "GU";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLogin(false);
    navigate("/login");
    localStorage.removeItem("loggedIn_User");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "black", boxShadow: "none" }}>
      <Toolbar>
        {/* Logo */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 50, mr: 2 }} />

        {/* Spacer to push right-aligned content */}
        <Box sx={{ flexGrow: 1 }} />

        {/* User Avatar and Logout */}
        {isLogin && (
          <>
            <Avatar sx={{ bgcolor: "green", mr: 2 }}>{letter}</Avatar>
            <IconButton onClick={handleLogout} sx={{ color: "black" }}>
              <LogoutIcon />
              <Typography sx={{ ml: 1, fontSize: 15, color: "white" }}>
                Logout
              </Typography>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Home;
