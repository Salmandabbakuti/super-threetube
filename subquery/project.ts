import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind
} from "@subql/types-ethereum";

const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "thirdtube-subql",
  description:
    "Subquery project to index and query data from the ThirdTube contract on the Meter",
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
    chainId: "83",
    endpoint: ["https://rpctest.meter.io"]
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 59835067,
      options: {
        // Must be a key of assets
        abi: "ThirdTube",
        address: "0xe04aa72b9fEa2219F300b3f8C3f9D1eafEfE382e"
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
