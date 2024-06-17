import { Contract } from "@ethersproject/contracts";
import { GraphQLClient, gql } from "graphql-request";
import { contractAddress, subqueryUrl } from "./constants";

const abi = [
  "function addVideo(string _title, string _description, string _category, string _location, string _thumbnailHash, string _videoHash)",
  "function tipVideo(uint256 _videoId, uint256 _amount) payable"
];
export const contract = new Contract(contractAddress, abi);

export const GET_VIDEOS_QUERY = gql`
  query videos(
    $first: Int
    $last: Int
    $offset: Int
    $before: Cursor
    $after: Cursor
    $orderBy: [VideosOrderBy!]
    $filter: VideoFilter
  ) {
    videos(
      first: $first
      last: $last
      offset: $offset
      before: $before
      after: $after
      orderBy: $orderBy
      filter: $filter
    ) {
      nodes {
        id
        title
        description
        location
        category
        thumbnailHash
        videoHash
        tipAmount
        createdAt
        channel {
          id
          owner
          createdAt
        }
      }
    }
  }
`;

export const subqueryClient = new GraphQLClient(subqueryUrl);
