import React from "react";
import { Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
const style = {
  wrapper: ` bg-[#15202b] border-[#38444d] border-b`,
};
function Homepage() {
  
  return (
    <div style={{ backgroundColor: '#15202b' }}>
       <AppBar position="static" sx={{ backgroundColor: '#15202b' }}>
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Twider
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
        
            <Image
              src="https://images.pexels.com/photos/7887812/pexels-photo-7887812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              width={500}
              height={500}
              layout="responsive"
            />
     
          </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
            <Typography variant="h6" sx={{ marginBottom: '1rem',fontSize:"16px",fontFamily:"cursive", color:'white' }}>
       
My app is essentially a Twitter-like platform that uses the Solidity network and Sepoliafaucet text network to authenticate users and save their tweets to the blockchain. This means that all of the user-generated content is completely secure and cannot be tampered with. Additionally, I've included features like liking and disliking posts and adding images to tweets, which make the platform more engaging and user-friendly.

One of the standout features of my app is Twidcoin, which allows users to add Ethereum to their wallets and then buy Twidcoin. This creates an entirely new economy within the platform, where users can transact with each other using a cryptocurrency that they can earn or buy.

While the UI is currently basic and not yet responsive, we are planning to add more functionality in the future,
 including a withdraw function that will allow users to complete transactions more easily.

       </Typography>
           <button className="btn"  >Lets Go</button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Homepage;
