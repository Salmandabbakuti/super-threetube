import { Contract } from "@ethersproject/contracts";
import { WebIrys } from "@irys/sdk";
import { GraphQLClient, gql } from 'graphql-request';

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

export const GET_VIDEOS_QUERY = gql`
  query videos(
    $first: Int
    $skip: Int
    $orderBy: Video_orderBy
    $orderDirection: OrderDirection
    $where: Video_filter
  ) {
    videos(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      title
      description
      location
      category
      thumbnailHash
      videoHash
      tipAmount
      channel {
        id
        owner
        createdAt
      }
      createdAt
    }
  }
`;

export const subgraphClient = new GraphQLClient("https://api.studio.thegraph.com/proxy/15343/3tube/version/latest");