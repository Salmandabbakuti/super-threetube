import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind
} from "@subql/types-ethereum";

const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "meter-starter",
  description:
    "This project can be use as a starting point for developing your new meter SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0"
    },
    query: {
      name: "@subql/query",
      version: "*"
    }
  },
  schema: {
    file: "./schema.graphql"
  },
  network: {
    chainId: "534351",
    endpoint: ["https://sepolia-rpc.scroll.io"]
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 4626748,
      options: {
        // Must be a key of assets
        abi: "ThirdTube",
        address: "0x62862E40B26281130B7a32dbF682ac56a0201f0A"
      },
      assets: new Map([["ThirdTube", { file: "./abis/ThirdTube.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleVideoAdded",
            filter: {
              topics: [
                "VideoAdded(uint256,string,string,string,string,string,string,address,uint256)"
              ]
            }
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleVideoTipped",
            filter: {
              topics: ["VideoTipped(uint256,uint256,uint256,address)"]
            }
          }
        ]
      }
    }
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter"
};

// Must set default to the project instance
export default project;
