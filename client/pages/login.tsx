import Image from "next/image";
import { Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import { useAppContext } from "../context/useProvider";
const style = {
  wrapper: `flex justify-center h-screen w-screen select-none  text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-12`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-1xl font-bold text-center `,
};

const Home = () => {
  const [tweet, setTweet] = useState([]);
  const [userData, setUserdata] = useState({email:""});
  const { loginFunction } = useAuth();
  const {chainChanged,provider} =useAppContext()
  useEffect(()=>{
   
    chainChanged()
  },[provider])
  const submitHandler = async () => {
    console.log(userData);
    if (userData?.email) {
      let result = await loginFunction(userData);
      console.log(result)
    } else {
      alert("Email not found");
    }
  };

 


 

  const Logo = (
    <div className={style.loginContainer}>
      <Image src="/assets/twitter.png" width={200} height={160} />
      <div className={style.loginContent}>Welcome To Daptter</div>
    </div>
  );

  return (
    <Layout>
      <div className={style.wrapper}>
        <div className="input-container">
          {Logo}
          <div className="input-wrapper">
            <FormControl>
              <TextField
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",

                  borderRadius: 20,
                  margin: 4,
                }}
                name="email"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                sx={{ minWidth: 550 }}
                className="outlined-input"
                label="Email"
                variant="outlined"
                type="email"
                required
              />
            </FormControl>
          </div>
          <div className="input-wrapper">
            <FormControl>
              <TextField
                sx={{ minWidth: 550 }}
                style={{
                  backgroundColor: "white",
                  color: "#1DA1F2",
                  borderRadius: 20,
                  margin: 4,
                }}
                name="password"
                onChange={(e) =>
                  setUserdata({ ...userData, [e.target.name]: e.target.value })
                }
                InputLabelProps={{ className: "textfield__label" }}
                InputProps={{ className: "textfield__input" }}
                className="outlined-input"
                label="Password"
                variant="outlined"
                type="password"
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
                backgroundColor: "#1DA1F2",
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#1DA1F2",
                  border: "#1DA1F2 2px solid",
                },
              }}
              variant="contained"
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
