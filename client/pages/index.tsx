import React from "react";
import { Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/home/Navbar";
import Home from "../components/home/Home";
const style = {
  wrapper: ` bg-[#15202b] border-[#38444d] border-b`,
};
function Homepage() {
  
  return (
    <div>
    
      <Home/>
    </div>
  );
}

export default Homepage;
