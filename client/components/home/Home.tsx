import { Grid } from "@mui/material";
import React from "react";

function Home() {
  return (
    <div className="h-screen">
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <img src="/assets/impact.png" alt="Logo" className="logo" />
         
            <div className="ml-20">
              <div className="dots-container">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
              <div className="dots-container">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
              <div className="dots-container">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
              <div className="dots-container">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
            </div>
            <div className="w-50">
              <h1>Welcome to my website!</h1>
              <p>
                My app is essentially a Twitter-like platform that uses the
                Solidity network and Sepoliafaucet text network to authenticate
                users and save their tweets to the blockchain. This means that
                all of the user-generated content is completely secure and
                cannot be tampered with. Additionally, I've included features
                like liking and disliking posts and adding images to tweets,
                which make the platform more engaging and user-friendly. One of
                the standout features of my app is Twidcoin, which allows users
                to add Ethereum to their wallets and then buy Twidcoin. This
                creates an entirely new economy within the platform, where users
                can transact with each other using a cryptocurrency that they
                can earn or buy. While the UI is currently basic and not yet
                responsive, I am planning to add more functionality in the
                future, including a withdraw function that will allow users to
                complete transactions more easily.
              </p>
            </div>
         
        </Grid>


<Grid
  container
  sx={{
    backgroundColor: "#0f1827",
    color: "white",
    height: "110vh",
    display: "flex",
    alignItems: "center",
    textAlign: "end",
  }}
  item
  xs={6}
>
    <span className="name absolute text-2xl top-6 right-0" style={{fontFamily:'cursive',zIndex:100}}><a href='/login'>
      By-Utkarsh Gubrelay</a></span> {/* Add absolute and top-0 classes */}
  <div className="relative flex justify-center mt-30"> {/* Add relative and flex classes */}
    <img src="/assets/5429482.jpg" alt="example" className="image" style={{marginLeft: "-70%"}} /> {/* Add marginLeft style */}
  </div>
  <div className="">
              <div className="dots-container">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
             {[...Array(6)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
                </div>
              <div className="dots-container">

                {[...Array(4)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
         
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
              <div className="dots-container">

{[...Array(2)].map((_, index) => (
  <div key={index} className="dot"></div>
))}

{[...Array(2)].map((_, index) => (
  <div key={index} className="dot"></div>
))}
</div>
            </div>
</Grid>

      </Grid>
    </div>
  );
}

export default Home;
