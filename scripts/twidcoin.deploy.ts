import { ethers } from "hardhat";

async function main() {

const TwidCoin=await ethers.getContractFactory('TwidCoin')
let twidCoin=await TwidCoin.deploy('0xA473861A8405AE95E2Af86a4147219EFC6DFF33A');
await twidCoin.deployed();
console.log(twidCoin.address,' TwidCoin Contract Address')


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
