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
    chainId: "82",
    endpoint: ["https://rpc.meter.io"]
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 56325881,
      options: {
        // Must be a key of assets
        abi: "ThirdTube",
        address: "0xbEF33B12a763a912f9BbF828A43A88F49d879D0C"
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
