import { Contract } from "@ethersproject/contracts";
import { GraphQLClient, gql } from "graphql-request";
import {
  contractAddress,
  subgraphUrl
} from "./constants";

const abi = [
  "function addVideo(string _title, string _description, string _category, string _location, string _thumbnailHash, string _videoHash)",
  "function tipVideo(uint256 _videoId, uint256 _amount) payable"
];
export const contract = new Contract(contractAddress, abi);

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
