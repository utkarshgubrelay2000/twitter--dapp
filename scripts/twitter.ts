import { ethers } from "hardhat";

async function main() {

const Twitter=await ethers.getContractFactory('Twitter')
let twitter=await Twitter.deploy();
await twitter.deployed();
console.log(twitter.address,'Cobtract Address')

}
//await transaction.RequestAmount('0xFABB0ac9d68B0B445fB7357272Ff202C5651694a',10000000000000,16726626)
//  await transaction.MyRequest()
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
