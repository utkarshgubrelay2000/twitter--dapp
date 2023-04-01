import { task, types } from "hardhat/config";

task("verify-etherscan", "Verify deployed contract on ")
  .addParam("contract", "Contract address deployed", undefined, types.string)
  .setAction(async(taskars,hre) => {
    try {
      let a=await hre.ethers.getSigners()
      await hre.run("verify:verify", {
        address: taskars.contract,
				contract: 'contracts/Transaction.sol' // <path-to-contract>:<contract-name>
      })
    } catch ({ message }) {
      console.error(message)
    }
  })