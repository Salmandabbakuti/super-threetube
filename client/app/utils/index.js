import { Contract } from "@ethersproject/contracts";
import { WebIrys } from "@irys/sdk";

const abi = [
  "function addVideo(string _title, string _description, string _category, string _location, string _thumbnailHash, string _videoHash)",
  "function tipVideo(uint256 _videoId, uint256 _amount) payable"
]; // ABI of the contract
const address = "0xdFDDbCa39CAf63ab04A75cB0f75356c50C757B8b"; // Address of the contract

export const contract = new Contract(address, abi);

export const getIrys = async (provider) => {
  const wallet = {
    name: "ethers",
    provider
  };
  const network = "devnet";
  const token = "ethereum";
  const webIrys = new WebIrys({
    wallet,
    network,
    token
  });
  await webIrys.ready();
  return webIrys;
};