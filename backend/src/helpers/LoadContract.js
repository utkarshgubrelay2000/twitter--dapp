import { ethers } from "ethers";
import * as dotenv from 'dotenv'
import path from 'path'
import 'dotenv/config';
dotenv.config({ path: path.join(__dirname,'../../.env') });
console.log(process.env.SEPOLIAURL, path.join(__dirname,'../../.env'))
export const  provider = new ethers.JsonRpcProvider(process.env.SEPOLIAURL);
export const loadContract=async(name)=>{
    try {
        
    
    let contract_object=require(`./contracts/${name}.sol/${name}.json`)
    var ContractAddress=name=='TwidCoin'?process.env.TWIDCOIN_CONTRACT:name=='Twitter'?process.env.TWITTER_CONTRACT:name=='User'?
    process.env.USER_CONTRACT:null
    let contract=new ethers.Contract(ContractAddress,contract_object.abi,provider)
   // console.log(contract)
    return {error:false,contract}

} catch (error) {
 return {error:true,message:error.message}       
}

}

