import { Grid } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <Grid container spacing={10}>
      <Grid item xs={8}>

      <img 
           src="/assets/impact.png"
           
           alt="Logo" className="logo" />
           </Grid>
      <Grid sx={{backgroundColor:"#0f1827"}} item xs={4}>

      <span className="name">Utkarsh Gubrelay</span>
      </Grid>
      </Grid>

    </div>
  );
}

export default Navbar;