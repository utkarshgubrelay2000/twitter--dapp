import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import './tasks'
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./client/public"
  },
  networks: {
    hardhat: {
    },
    goerli: {
      url: process.env.SEPOLIAURL,
      accounts: [process.env.ACCOUNT]
    }
  },
};

export default config;
