import Feed from "../components/home/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import metamaskLogo from "../assets/metamask.png";
import errorImg from "../assets/error.png";
import Image from "next/image";
import { useAppContext } from "../context/useProvider";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import Layout from "../components/Layout";
const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
};

const Home = () => {
  const {
    accounts,
    provider,
    connectWallet,
    web3Hooks,
    contract,
    chainChanged,
  } = useAppContext();
  useEffect(() => {
    chainChanged();
  }, []);
  const [tweet, setTweet] = useState([]);
  const LoadTweets = async () => {
    if (contract) {
      let tweets = await contract.methods.getAllTweets().call();
      let isLoggedIn = localStorage.getItem("tby");
      if (!isLoggedIn) {
        let a = await contract.methods.signupUser().send({ from: accounts });
        localStorage.setItem("tby", "Yes");
      }
      //console.log(a)
      setTweet(tweets);
    }
  };

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar initialSelectedIcon={"Home"} />
      <Feed tweet={tweet} />
      <Widgets />
    </div>
  );

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>Connect to Metamask.</div>
    </div>
  );

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  );

  const error = (
    <div className={style.loginContainer}>
      <Image src={errorImg} width={250} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  );

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  );

  return (
    <div className={style.wrapper}>
      <Layout>
        <div className={style.wrapper}>
          <div className="input-container">
            <div className="input-wrapper">
              <FormControl>
                <Select
                  sx={{ minWidth: 550 }}
                  placeholder="Tranfer To"
                  className="select-game-inner"
                  style={{
                    backgroundColor: "white",
                    color: "#1DA1F2",      
                    margin: 4,
                  }}
                  fullWidth
                >
                  <MenuItem value={""}>Name Values</MenuItem>
                </Select>
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
                  InputLabelProps={{ className: "textfield__label" }}
                  InputProps={{ className: "textfield__input" }}
                  className="outlined-input"
                  label="Tranfer Eth"
                  variant="outlined"
                  type="number"
                  required
                />
              </FormControl>
            </div>

            <div className="signIn-button">
              <Link href="/mfa">
                <Button
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
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
