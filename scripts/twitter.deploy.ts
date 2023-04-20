import { ethers } from "hardhat";

async function main() {

const Twitter=await ethers.getContractFactory('Twitter')
let twitter=await Twitter.deploy();
await twitter.deployed();
console.log(twitter.address,'Contract Address')


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
