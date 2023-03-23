import { task } from "hardhat/config";

task("deploy", "Deploys NFT Smart contract").setAction(
    async (_args:any, { ethers, run }) => {
      await run("compile");
      const [deployer] = await ethers.getSigners();
      const currentTimestampInSeconds = Math.round(Date.now() / 1000);
      const unlockTime = currentTimestampInSeconds + 60;
      const nonce = await deployer.getTransactionCount();
      const lockedAmount = ethers.utils.parseEther("0.001");

      const NFT = await ethers.getContractFactory("Lock");
      const nft = await NFT.deploy(unlockTime);
  
      await nft.deployed();
  
      console.log("NFT Deployed to :", nft.address);
      return nft.address
    }
  );