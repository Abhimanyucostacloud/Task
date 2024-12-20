import { CatchingPokemon } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

const Menu = () => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <CatchingPokemon />
        </IconButton>
        <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
          POKEMONAPP
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
