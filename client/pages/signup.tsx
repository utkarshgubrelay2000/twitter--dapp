import Image from "next/image";
import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import Layout from "../components/Layout";
import twitterImg from "../assets/twitter.png";
import useAuth from "../hooks/useAuth";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none  text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-8`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-10`,
};

const Home = () => {
  const [userData, setUserdata] = useState({email:""});
  const { registerFunction } = useAuth();

  const submitHandler = async () => {
    console.log(userData);
    if (userData?.email) {
      let result = await registerFunction(userData);
    } else {
      alert("Email not found");
    }
  };
  const Logo = (
    <div className={style.loginContainer}>
      <Image src={twitterImg} width={200} height={60} />
      <div className={style.loginContent}>Welcome To Daptter</div>
    </div>
  );

  return (
    <Layout>
      <div className={style.wrapper}>
        <div className="input-container">
          {Logo}
          <div className="input-wrapper " style={{ display: "flex" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <TextField
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",
                  width: "100%",
                  margin: 4,
                }}
                InputLabelProps={{ className: "textfield__label" }}
                InputProps={{ className: "textfield__input" }}
                label="First Name"
                variant="outlined"
                type="text"
                name="first_name"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                required
              />
              <TextField
                //   backgroundColor: 'white',color:'#15202b'
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",
                  margin: 4,
                  width: "100%",
                }}
                InputLabelProps={{ className: "textfield__label" }}
                InputProps={{ className: "textfield__input" }}
                label="Last Name"
                variant="outlined"
                type="text"
                name="last_name"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <FormControl>
              <TextField
                sx={{ minWidth: 550 }}
                //   backgroundColor: 'white',color:'#15202b'
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",

                  margin: 4,
                }}
                name="email"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                InputLabelProps={{ className: "textfield__label" }}
                InputProps={{ className: "textfield__input" }}
                label="Email"
                variant="outlined"
                type="text"
                required
              />
            </FormControl>
          </div>

          <div className="input-wrapper">
            <FormControl>
              <TextField
                sx={{ minWidth: 550 }}
                //   backgroundColor: 'white',color:'#15202b'
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",

                  margin: 4,
                }}
                name="password"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                InputLabelProps={{ className: "textfield__label" }}
                InputProps={{ className: "textfield__input" }}
                label="Password"
                variant="outlined"
                type="password"
                required
              />
            </FormControl>
          </div>
          <div className="input-wrapper">
            <FormControl>
              <TextField
                sx={{ minWidth: 550 }}
                //   backgroundColor: 'white',color:'#15202b'
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",

                  margin: 4,
                }}
                InputLabelProps={{ className: "textfield__label" }}
                InputProps={{ className: "textfield__input" }}
                label="Wallet Address"
                variant="outlined"
                type="text"
                name="wallet_address"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                required
              />
            </FormControl>
          </div>
          <div className="signIn-button">
            <Button
              onClick={submitHandler}
              sx={{
                width: 550,
                borderRadius: 1,
                paddingTop: 1.1,
                paddingBottom: 1.1,
                background: "white",
                color: "#ffffff",
                border: "white 2px solid",

                "&:hover": {
                  backgroundColor: "#1DA1F2",
                  color: "white",
                },
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
