import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadContract } from "./ContractLoader";
import { toast } from "react-toastify";
export const TwitterContext = createContext();
export const TwitterProvider = ({ children }) => {
  const [ether, setEther] = useState("");
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  const [contract,setContract] = useState({});
  useEffect(() => {
    setProvider(window.ethereum);
    if (provider) {
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
  const chainChanged = () => {
    if (provider) {
      window.ethereum.on("accountsChanged", function (networkId) {
        setAccount(networkId[0]);
      });
      provider.on("networkChanged", function (networkId) {
        // Time to reload your interface with the new networkId
        // .log("provider");
      });
    }
  };
  useEffect(() => {
    connect();

  }, [account]);
  const connect = async () => {
  //  console.log(ether, "etherrss");
    try {
      
   
    if (provider) {
      let accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      console.log(account)
    }
  } catch (error) {
      
      toast.error('Already connection is Open')
  }
  };
  const extractContract = async (eth) => {
    try {
      if (provider) {
        const signerOrProvider = eth.getSigner();
        let contract = new ethers.Contract(
          process.env.TWITTER_CONTRACT,
          await LoadContract("Twitter"),
          signerOrProvider
        );
        console.log(contract);
        setContract(contract)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TwitterContext.Provider
      value={{ chainChanged, provider, ether, connect, account,contract }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

export function useAppContext() {
  return useContext(TwitterContext);
}
