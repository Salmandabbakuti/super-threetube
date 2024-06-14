import { ethers } from "hardhat";

async function main() {
  const contractInstance = await ethers.deployContract("ThreeTube");

  await contractInstance.waitForDeployment();
  return contractInstance;
}

main()
  .then(async (contractInstance) => {
    console.log("Contract deployed to:", contractInstance.target);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
