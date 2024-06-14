import { Contract } from "@ethersproject/contracts";
import { GraphQLClient, gql } from "graphql-request";
import { formatEther, parseEther } from "@ethersproject/units";
import {
  fDAIxAddress,
  fUSDCxAddress,
  fTUSDxAddress,
  ETHxAddress,
  contractAddress,
  cfav1ForwarderAddress,
  subgraphUrl
} from "./constants";

const abi = [
  "function addVideo(string _title, string _description, string _category, string _location, string _thumbnailHash, string _videoHash)",
  "function tipVideo(uint256 _videoId, uint256 _amount) payable"
]; // ABI of the contract

export const contract = new Contract(contractAddress, abi);

const cfav1ForwarderABI = [
  "function createFlow(address token, address sender, address receiver, int96 flowrate, bytes userData) returns (bool)",
  "function updateFlow(address token, address sender, address receiver, int96 flowrate, bytes userData) returns (bool)",
  "function deleteFlow(address token, address sender, address receiver, bytes userData) returns (bool)"
];
// load contracts
export const cfav1ForwarderContract = new Contract(
  cfav1ForwarderAddress,
  cfav1ForwarderABI
);

export const supportedSuperTokens = [
  {
    name: "fDAIx",
    symbol: "fDAIx",
    address: fDAIxAddress,
    icon: "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/dai/icon.svg"
  },
  {
    name: "fUSDCx",
    symbol: "fUSDCx",
    address: fUSDCxAddress,
    icon: "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/usdc/icon.svg"
  },
  {
    name: "fTUSDx",
    symbol: "fTUSDx",
    address: fTUSDxAddress,
    icon: "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/tusd/icon.svg"
  },
  {
    name: "ETHx",
    symbol: "ETHx",
    address: ETHxAddress,
    icon:
      "https://raw.githubusercontent.com/superfluid-finance/assets/master/public/tokens/eth/icon.svg"
  }
];

export const calculateFlowRateInTokenPerMonth = (amount) => {
  if (isNaN(amount)) return 0;
  // convert from wei/sec to token/month for displaying in UI
  // 2628000 = 1 month in seconds(sf recommendation)
  const flowRate = (formatEther(amount) * 2628000).toFixed(9);
  // if flowRate is floating point number, remove unncessary trailing zeros
  return flowRate.replace(/\.?0+$/, "");
};

export const calculateFlowRateInWeiPerSecond = (amount) => {
  // convert amount from token/month to wei/second for sending to superfluid
  const flowRateInWeiPerSecond = parseEther(amount.toString())
    .div(2628000)
    .toString();
  return flowRateInWeiPerSecond;
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

export const subgraphClient = new GraphQLClient(subgraphUrl);
