# ThirdTube

Welcome to ThirdTube, a decentralized Ad-free video sharing platform where creators can share their content and viewers can directly support them through tips. ThirdTube ensures that content ownership and monetization remain in the hands of creators. The platform is built on Meter and SubQuery to provide a seamless experience for creators and viewers.

### Features

- **Direct Creator Support**: Viewers can tip creators, ensuring that creators receive the full amount without any intermediaries.

- **Decentralized Video Storage**: Videos are stored on IPFS, a decentralized storage network, ensuring that content remains online and accessible.

- **Ad-Free Experience**: No ads, no tracking, and no data collection. Enjoy a clean and private viewing experience.

- **Creator Profiles**: Unique profiles for each creator, showcasing their videos and receiving tips.

- **Browsing and Searching**: Browse and search for videos by various categories, creator, or title.

## Getting Started

### 1. Deploying the Smart Contracts

This project is scaffolded using [hardhat](). Please refer to the documentation for more information on folder structure and configuration.

> Copy the `.env.example` file to `.env` and update the environment variables with your own values.

```bash

npm install

npx hardhat compile

npx hardhat run scripts/deploy.ts --network scrollSepolia

```

2. Deploying the Subgraph

> Create new subgraph in TheGraph studio and update package.json `deploy` script with your subgraph id. Update `subgraph/subgraph.yaml` with your contract address and block number.

```bash
cd subgraph

npm install

npm run deploy
```

### 3. Running the Frontend

> Copy the `.env.example` file to `.env` and update the environment variables with your own values. Update `client/utils/constants.ts` with your contract address and subgraph url.

```bash
cd client

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployed Resources

- [ThirdTube Contract](https://scan.meter.io/address/0x5afb5a3e38252c08b6498306d131516d12b450b4)
- [ThirdTube SubQuery](https://explorer.subquery.network/subquery/Salmandabbakuti/thirdtube-meter-sq)
- [Client App](https://example.com/)

### Demo

![Screen1](https://github.com/Salmandabbakuti/super-threetube/assets/29351207/9db538c2-a759-4914-8e40-46e683c7f8ba)

![Screen2](https://github.com/Salmandabbakuti/super-threetube/assets/29351207/f2273ae8-878e-4707-99a9-a75c799b05cf)

## Change Log

### v0.0.1

- Initial release with basic features(Video List, Upload Video, Watch, Channels, Tipping, Subquery integration)

### v0.0.2

- Added Global Search, Categories Filtering

## Built With

- [Meter](https://meter.io/) - Meter Blockchain system uses Proof of Work to create a fully-decentralized, low-volatility coin MTR for fees and payments, and HotStuff-based Proof of Stake with the MTRG governance coin to validate transactions..
- [Third Web](https://thirdweb.com) - Full-stack, open-source web3 development platform. Frontend, backend, and onchain tools to build complete web3 apps — on every EVM chain.
- [IPFS](https://ipfs.io/) - A peer-to-peer hypermedia protocol and file sharing peer-to-peer network for storing and sharing data in a distributed file system.
- [Ethers.js](https://docs.ethers.io/v5/) - A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem
- [SubQuery](https://subquery.network) - SubQuery is a fast, flexible, and reliable open-source data decentralised infrastructure network, providing both RPC and indexed data to consumers around the world..
- [Next.js](https://nextjs.org/) - The React Framework for Production.
- [Antd](https://ant.design/) - A design system for enterprise-level products. Create an efficient and enjoyable work experience.

## Safety

This is experimental software and subject to change over time.

This is a proof of concept and is not ready for production use. It is not audited and has not been tested for security. Use at your own risk. I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
