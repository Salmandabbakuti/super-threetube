import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
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
    /**
     * chainId is the EVM Chain ID, for meter this is 82
     * https://chainlist.org/chain/82
     */
    chainId: "83",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://rpctest.meter.io"]
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 59835067, // This is the block that the contract was deployed on
      options: {
        // Must be a key of assets
        abi: "ThirdTube",
        // This is the contract address for wrapped ether https://scan.meter.io/address/0x983147fb73a45fc7f8b4dfa1cd61bdc7b111e5b6
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
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                "VideoAdded(uint256,string,string,string,string,string,string,address,uint256)"
              ]
            }
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleVideoTipped",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
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
