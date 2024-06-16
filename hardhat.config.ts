import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    meter: {
      url: "https://rpc.meter.io",
      chainId: 82,
      accounts
    },
    meterTestnet: {
      url: "https://rpctest.meter.io",
      chainId: 83,
      accounts
    }
  }
};

export default config;
