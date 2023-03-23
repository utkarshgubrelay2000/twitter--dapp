import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import './tasks'
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/b17f99e3549d496da4bf879ecde791e8'",
      accounts: ['e44376f04052ca1d4148def1778c2c8e563d5f214e99adf28a066c714f2d9980']
    }
  },
};

export default config;
