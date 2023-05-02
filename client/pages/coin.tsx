import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/useProvider";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import {
  Typography,
  Button,
  Tab,
  Tabs,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { ethers } from "ethers";
import { toast } from "react-toastify";

// define Twitter color palette
const twitterColors = {
  blue: "#1DA1F2",
  darkBlue: "#15202b",
  lightBlue: "#EFF9FF",
};

const useStyles = {
  container: {
    alignItems: "center",
    backgroundColor: twitterColors.darkBlue,
    boxShadow: "0 0 10px #fff",
    margin:10,
    padding: 30,
    width: 1000,
    display: "flex",
    
  },
  container2: {
    alignItems: "center",
    backgroundColor: twitterColors.darkBlue,

    padding: 30,
    width: 1000,
    display: "flex",
    
  },
  coinsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItem: "space-between",
    backgroundColor: '#ffffff',
  
    margin:'20px',
    borderRadius: 5,
    padding: "10px 20px",
    marginBottom: 20,
    width:500
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItem: "space-between",
 
    borderRadius: 5,
    padding: "10px 20px",
    marginBottom: 20,
    width:500
  },
  buyButton: {
 
    backgroundColor: 'white',
    color: "#15202b",
  },
  formControl: {
    minWidth: 600,
   
    margin:40,
    display:'flex'
  },
  sendButton: {
    backgroundColor: 'white',
    color: "#15202b",
    
    padding:12,
    "&:hover": {
      backgroundColor: twitterColors.blue,
    },
  },
};
const style = {
  wrapper: ` bg-[#15202b] border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent text-[#ffff] outline-none font-bold`,
  // wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-3/3 flex justify-between`,
  mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-auto`,
  secondary: `text-[#fff] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `h-[15vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full h-16`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#fff]`,
  activeNav: `text-white`,
};

function ProfilePage() {
  const [coins, setCoins] = useState("");
  const [coinCost, setcoinCost] = useState("");
  const [coinsValue, setCoinsValue] = useState("");
  const [ether, setEther] = useState(0);
  const [bal, setBal] = useState("");
  const [users, setUsers] = useState([]);

  const [tabValue, setTabValue] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [userAdd, setuserAdd] = useState("true");
  const { twidCoin, account,userContract, profile } = useAppContext();

  const handleBuyCoins = async () => {
    try {
      
      const weiValue = ethers.utils.parseEther(".001");

      let res = await twidCoin.buyCoin(weiValue);
      console.log(res);
      getMyCoins()
    } catch (error: any) {
       console.log(error.error)
      toast.error(error?.error?.message || "Something went wrong");
    }
  };
  const toggleApprovel = async () => {
    try {
 
      let res = await twidCoin.toggleApprovel(selectedUser);
      console.log(res);
     
    } catch (error: any) {
       console.log(error.error)
      toast.error(error?.error?.message || "Something went wrong");
    }
  };
  const seeToggle=async (address:any) => {
    try {
 
      let res = await twidCoin.seeToggle(address);
      console.log(res,'See Toggle');
      setToggle(res)
    } catch (error: any) {
       console.log(error.error)
      toast.error(error?.error?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getMyCoins();
  }, [twidCoin]);
  const getMyCoins = async () => {
    try {
      
   // console.log(twidCoin)
    if (twidCoin) {
      let coins = await twidCoin.myCoinAndValue();
      let coinCost = await twidCoin.coinCost();
      let balance = await twidCoin.getBalance();
      let usersArray = await userContract.get_all_users();
      let add = await userContract.address;
      console.log(userContract,coins,'userArray');
      setuserAdd(add)
      setUsers(usersArray)
      setBal(ethers.utils.formatEther(balance));
      setcoinCost(ethers.utils.formatEther(coinCost));

      setCoins(ethers.utils.formatEther(coins[0]));
      //setBal(ethers.utils.formatEther(balance));
      setCoinsValue(ethers.utils.formatEther(coins[1]));
    }
  } catch (error) {
      console.log(error)
  }
  };
  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const handleUserChange = (event: any) => {
    seeToggle(event.target.value)
    setSelectedUser(event.target.value);
  };

  const handleSendEther = async () => {
    // send ether logic here
if(ether){
    const weiValue = ethers.utils.parseEther(ether.toString());
    let coinCost = await twidCoin.addFunds({ value: weiValue });
    console.log(coinCost);
    getMyCoins()}
    else{
      toast.error("Enter Value")
    }
  };

  const handleTweetSubmit = async() => {
 try {
  if(ether){

    const weiValue = ethers.utils.parseEther(ether.toString());
    console.log(weiValue)
    let res=await twidCoin.transfer(selectedUser,weiValue)
    console.log(res,weiValue)
  }
  else{
    toast.error("Enter Value")
  }
    
  } catch (error) {
    console.log(error)
  }
  };

  return (
    <Layout isAuth={true}>
    <div className={style.wrapper}>
     
      <Grid container spacing={10}>
        <Grid item xs={3}>
          <Sidebar initialSelectedIcon={"Profile"} />
        </Grid>
        <Grid container item xs={9}>
          <Grid item xs={12}>
            <div className={style.coverPhotoContainer}>
              <img   src={profile.image_url} alt="cover" className={style.coverPhoto} />
            </div>
            <div className={style.profileImageContainer}>
              <div>
                <img
                  src={profile.image_url}
                  alt={account}
                  className={style.profileImage}
                />
              </div>
            </div>
            <div className={style.details}>
              <div>
                <div className={style.primary}>
                  {" "}
                  <>
                    @{account?.slice(0, 8)}...{account?.slice(37)}
                  </>
                </div>
              </div>
            </div>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Profile and Tweets tabs"
            >
              <Tab style={{color: 'white'}} label="Twid Coin" />
              <Tab style={{color: 'white'}} label="Transfer" />
              <Tab style={{color: 'white'}} label="ADD Funds" />
            </Tabs>
            <Box >
            <div style={useStyles.container}>
                <div style={useStyles.coinsContainer}>
                  <Typography  variant="h6">
                    Coins in your wallet: {coins}
                  </Typography>
                
                </div>
                <div style={useStyles.coinsContainer}>
                  <Typography  variant="h6">
                    Balance in your wallet: {bal}
                  </Typography>
                
                </div>
                
              </div>
            </Box>
            <Box
              sx={{
                width: 1000,
                height: 1000,
              }}
              hidden={tabValue !== 0}
            >
             
              <div className="flex justify-center">
              <div >
            
                <div style={useStyles.coinsContainer}>

                <Button style={useStyles.buyButton} onClick={handleBuyCoins}>
                <Typography  variant="h6">

                  Buy Coins {coinCost}
                </Typography>
                </Button>
                </div>
                </div>
                </div>
            </Box>
            <Box hidden={tabValue !== 1}>
              <FormControl style={useStyles.formControl}>
                
            <div style={useStyles.container2}>
            <div style={useStyles.inputContainer}>
            
                <input
          className="input-field"
          type="number"
          
          placeholder="Send Ether to Your  Friends Account"
          onChange={(e: any) => setEther(e.target.value)}
          />
          </div>
          <div style={useStyles.inputContainer}>
         
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  sx={{width:'100%',backgroundColor:'white'}}
                 // value={selectedUser}
                 placeholder="Select Your Partner"
                  onChange={handleUserChange}
                >
                  {users.map((item:any)=>{
                   
                 return   item?.wallet?.toUpperCase()!=account.toUpperCase()?(<MenuItem value={item.wallet}>{item.user_name}</MenuItem>):null})}
                </Select>
                </div>
                </div>
             
              </FormControl>
              <div className="flex justify-center">

             
              {
                !selectedUser&&!toggle? <Button style={useStyles.buyButton} >
                <Typography  variant="h6">

                Select User
                </Typography>
              </Button>:toggle?

                <Button style={useStyles.buyButton} onClick={handleTweetSubmit}>
                <Typography  variant="h6">

                Send Ether
                </Typography>
              </Button>
              :   <Button style={useStyles.buyButton} onClick={toggleApprovel}>
                <Typography  variant="h6">

              Send Approval
              </Typography>
            </Button>}
            </div>
            </Box>
            <Box hidden={tabValue !== 2}>
              <FormControl style={useStyles.formControl}>
              <Grid container spacing={6}>
        <Grid item xs={6}>
                <input
          className="input-field"
          type="number"
        
          placeholder="Add Ether to Your Account"
          onChange={(e: any) => setEther(e.target.value)}
        />
        </Grid>
        <Grid item xs={6}>

              <Button style={useStyles.buyButton} onClick={handleSendEther}>
                Send Ether
              </Button>
        </Grid>
        </Grid>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Grid>
     </div>
    </Layout>
  );
}
export default ProfilePage;
