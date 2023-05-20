import { ethers } from "ethers";
import { Response } from "express";
import * as dotenv from 'dotenv'
import path from 'path'
import 'dotenv/config';
import { loadContract, provider } from "../../helpers/LoadContract";
dotenv.config({ path: path.join(__dirname,'../../.env') });

export const add_twit = async (req:any, res:any) => {
  try {
    const contractAddress = "CONTRACT_ADDRESS"; // replace with your contract address
  let {contract}:any=await loadContract('Twitter')
    const signer = await getSigner(); // function that retrieves the user's signer object
  
    const timestamps = Math.floor(Date.now() / 1000);
    const message = "Hello world!";
    const img = "https://example.com/image.jpg";
    const tx = await contract.createPost(timestamps, message, img)
    
    // Wait for the transaction to be confirmed
   // await tx.wait();
    
    console.log("Post created!");
    res.json("CReate")
  } catch (error:any) {
    res.status(503).json({ error: true, msg: error.message });
  }
};



export const add_twsit = async () => {
  try {
    const contractAddress = "CONTRACT_ADDRESS"; // replace with your contract address
  let {contract}:any=await loadContract('Twitter')
    const signer = await getSigner(); // function that retrieves the user's signer object
  
    const timestamps = Math.floor(Date.now() / 1000);
    const message = "Hello world!";
    const img = "https://example.com/image.jpg";
    const tx = await contract.createPost(timestamps, message, img)
    
    // Wait for the transaction to be confirmed
   // await tx.wait();
    
    console.log("Post created!");
   // res.json("CReate")
  } catch (error:any) {
    console.log(error)
   // res.status(503).json({ error: true, msg: error.message });
  }
};
add_twsit()

const getSigner = async () => {
  const privateKey = "938672db3c209a570290908190698bb5230c3bdb49a81b83394e81cd4a1a48d6"; // replace with the user's private key
  const wallet = new ethers.Wallet(privateKey);
  const connectedWallet = wallet.connect(provider);
console.log(connectedWallet)
  return connectedWallet;
};