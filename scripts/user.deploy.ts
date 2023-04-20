import { ethers } from "hardhat";

async function main() {

const User = await ethers.getContractFactory("User");
let user=await User.deploy();
await user.deployed();
console.log(user.address,'Contract Address')
                       
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
