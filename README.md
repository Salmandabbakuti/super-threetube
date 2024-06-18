# Super ThreeTube

Welcome to ThreeTube, a decentralized Ad-free video sharing platform where creators can share their content and viewers can directly support them through tips. By leveraging the Superfluid protocol, ThreeTube introduces an innovative way of supporting content creators through real-time token streaming, offering a seamless and continuous monetization experience. ThreeTube ensures that content ownership and monetization remain in the hands of creators.

- **The code related to the Superfluid integration for tipping and supporting content creators can be found at https://github.com/Salmandabbakuti/sf-socilafi-wavehack/blob/main/client/app/watch/%5Bid%5D/page.jsx#L92**

### Features

- **Real-Time Tipping with Superfluid**: Integrate Superfluid for tipping, allowing viewers to stream money in real-time as they enjoy the content. This innovative approach ensures creators are continuously supported without delays.

- **Superfluid Subscriptions**: Future integration will allow viewers to subscribe to their favorite creators on a monthly basis to access premium content, providing consistent support through Superfluid's subscription model.

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

- [ThreeTube Contract](https://sepolia.scrollscan.com/address/0x62862e40b26281130b7a32dbf682ac56a0201f0a)
- [ThreeTube Subgraph](https://api.studio.thegraph.com/query/15343/3tube-sepolia/version/latest)
- [Client App](https://example.com/)

### Demo

![Screen1](https://github.com/Salmandabbakuti/super-threetube/assets/29351207/a99d782d-ffe0-49d8-8bfc-9076749b3be6)

![Screen2](https://github.com/Salmandabbakuti/super-threetube/assets/29351207/058d9300-8c88-4d42-ae0e-f825a1ab0e0a)

## Change Log

### v0.0.1

- Initial release with basic features(Video List, Upload Video, Watch, Channels, Tip with Superfluid, Subgraph integration)

### v0.0.2

- Added Global Search, Categories Filtering

## Built With

- [Scroll Blockchain](https://scroll.io/) - A decentralized, privacy-focused blockchain that enables scalable, low-cost, and private transactions. Seamlessly extends Ethereum’s capabilities through zero knowledge tech and EVM compatibility.
- [Third Web](https://thirdweb.com) - Full-stack, open-source web3 development platform. Frontend, backend, and onchain tools to build complete web3 apps — on every EVM chain.
- [IPFS](https://ipfs.io/) - A peer-to-peer hypermedia protocol and file sharing peer-to-peer network for storing and sharing data in a distributed file system.
- [Ethers.js](https://docs.ethers.io/v5/) - A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem
- [The Graph](https://thegraph.com/) - an indexing protocol for organizing and accessing data from blockchains and storage networks.
- [Next.js](https://nextjs.org/) - The React Framework for Production.
- [Antd](https://ant.design/) - A design system for enterprise-level products. Create an efficient and enjoyable work experience.

## Safety

This is experimental software and subject to change over time.

This is a proof of concept and is not ready for production use. It is not audited and has not been tested for security. Use at your own risk. I do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
