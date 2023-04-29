import { ethers } from "hardhat";

async function main() {

const Mint=await ethers.getContractFactory('Mint')
let mint=await Mint.deploy();
await mint.deployed();
console.log(mint.address,'Contract Address')


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
