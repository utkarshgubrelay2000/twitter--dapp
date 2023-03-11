import Web3 from "web3";
import { createContext, useContext, useEffect, useState } from "react";
import {LoadContract} from './ContractLoader'
export const TwitterContext = createContext();
export const TwitterProvider = ({children}) => {
  const [provider,setProvider]=useState(null)
  const [web3Hooks, setweb3Hooks] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract,setContract]=useState(null);
  useEffect(() => {
    getWeb3Data();
    chainChanged()
    
  }, [provider]);
useEffect(()=>{
 Loader()
},[web3Hooks])
const Loader=async ()=>{
  try {
    
    let con= await LoadContract('Migrations',web3Hooks)
    console.log(con)
    setContract(con)
  } catch (error) {
    console.log(error)
  }
}
  const getWeb3Data = async () => {
    let p=window.ethereum
    setProvider(p)
    if(p){
        const web3 = new Web3(p);
        let accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setweb3Hooks(web3);
    }
  };
 
  const chainChanged=()=>{
 if(provider){

   provider && provider.on('accountsChanged',account=>{
     //  console.log(account)
     setAccount(account[0])
    })
    provider &&  provider.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  }
}
  const connectWallet=async ()=>{
    console.log('hello')
    try {
      
      await  provider.request({method:"eth_requestAccounts"})
    } catch (error) {
      console.log(error)
    }
  } 
  return (
    <TwitterContext.Provider
      value={{
        connectWallet:connectWallet,
        web3Hooks:web3Hooks,
        accounts:account,
        provider:provider,
        contract:contract,
        chainChanged:chainChanged
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};

export function useAppContext() {
    return useContext(TwitterContext);
 }
 