import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

export const TwitterContext = createContext();
export const TwitterProvider = ({ children }) => {
  const [ether, setEther] = useState("");
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  useEffect(() => {
    setProvider(window.ethereum);
    if (provider) {
      getEthers();
    }
  }, [1]);
  useEffect(() => {
    chainChanged();
  }, [provider]);
  const getEthers = async () => {
    try {
      // .log(provider);

      if (provider) {
        connect()
        const eth = new ethers.providers.Web3Provider(window.ethereum);

        setEther(eth);
      }
    } catch (error) {
      // .log(error);
    }
  };
  const chainChanged = () => {
    if (provider) {
      window.ethereum.on("accountsChanged", function (networkId) {
        // .log("changed");
        console.log(networkId)
        setAccount(networkId[0])
      });
      provider.on("networkChanged", function (networkId) {
        // Time to reload your interface with the new networkId
        // .log("provider");
      });
    }
  };
  useEffect(()=>{
    connect()
  },[account])
  const connect = async () => {
    // .log(ether);
    if(provider){

      let accounts = await provider.request({method:"eth_requestAccounts"});
      console.log(accounts, "ether");
      
      setAccount(accounts[0]);
    }
   
  };
  return (
    <TwitterContext.Provider
      value={{ chainChanged, provider, ether, connect, account }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

export function useAppContext() {
  return useContext(TwitterContext);
}
