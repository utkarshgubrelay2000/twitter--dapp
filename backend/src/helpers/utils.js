import {ethers,JsonRpcApiProvider} from 'ethers' 
var url = 'https://goerli.infura.io/v3/b17f99e3549d496da4bf879ecde791e8';
export const eth=async()=>{
    let customHttpProvider = new ethers.InfuraProvider('goerli')
  let a=await customHttpProvider.getBalance('0xac524DdD17f88e7b0F47ad20517B54cEFbc0a0f2')
  console.log(ethers.toBigInt(a))
}

export default eth;