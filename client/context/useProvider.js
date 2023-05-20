import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadContract } from "./ContractLoader";
import { toast } from "react-toastify";
export const TwitterContext = createContext();
export const TwitterProvider = ({ children }) => {
  const [ether, setEther] = useState("");
  const [tweets,setTweets]=useState([])
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState({});
  const [contract,setContract] = useState({});
  const [twidCoin,settwidCoin] = useState(null);
  const [userContract,setUserContract] = useState(null);
  const [isNetworkCorrect,setIsNetworkCorrect] = useState(true);
  let networkIds =[11155111,1322]
  
  useEffect(() => {
    setProvider(window.ethereum);
    if (provider) {
      getProfile()
      getEthers();
    }
  }, [provider]);
  useEffect(() => {
    chainChanged();
  }, [provider]);
  const getEthers = async () => {
    try {
   const eth = new ethers.providers.Web3Provider(window.ethereum);
        await extractContract(eth);
        connect()
        setEther(eth);
    
    } catch (error) {
      // .log(error);
    }
  };
  const getProfile= async()=>{
    try {
      
    
if(userContract){
console.log('hello')
  let res=await userContract?.getProfileDetails(account)
  // console.log(res,"heelo")
  setProfile(res)
}
} catch (error) {
   // console.log(error)   
}

  }
  useEffect(() => {
    LoadPost();
  }, [contract]);
  const chainChanged = () => {
    if (provider) {
      window.ethereum.on("accountsChanged", function (networkId) {
        setAccount(networkId[0]);
        window.location.href='/login'
      });
    
    }
  };
  useEffect(() => {
    connect();

  }, [account]);
  const connect = async () => {
  //  // console.log(ether, "etherrss");
    try {
      
   
    if (provider) {
      let accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      // console.log(account)
    }
  } catch (error) {
      
      toast.error('Already connection is Open')
  }
  };
  const extractContract = async (eth) => {
    try {
      if (provider) {
      //  console.log(process.env.TWITTER_CONTRACT,"contracttt",)
        const signerOrProvider = eth.getSigner();
        let contract = new ethers.Contract(
          process.env.TWITTER_CONTRACT,
          await LoadContract("Twitter"),
          signerOrProvider
        );
        let ucontract = new ethers.Contract(
          process.env.USER_CONTRACT,
          await LoadContract("User"),
          signerOrProvider
        );
        let tcontract = new ethers.Contract(
          process.env.TWIDCOIN_CONTRACT,
          await LoadContract("TwidCoin"),
          signerOrProvider
        );      
      
        setContract(contract)
        setUserContract(ucontract)
        settwidCoin(tcontract)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoadPost = async () => {
    try {
        if (contract) {
          let res = await contract?.getAllPosts();
          console.log(res);
          if(res){
            setTweets(res)
          }
        }
      } catch (error) {
      console.log(error.message)
      }
      };

  return (
    <TwitterContext.Provider
      value={{ chainChanged,profile,isNetworkCorrect,userContract,getProfile,twidCoin, provider,tweets,LoadPost, ether, connect, account,contract }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

export function useAppContext() {
  return useContext(TwitterContext);
}
