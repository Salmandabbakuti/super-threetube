"use client";
import { useState, useEffect } from "react";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  rainbowWallet,
  trustWallet
} from "@thirdweb-dev/react";
import { Meter, MeterTestnet } from "@thirdweb-dev/chains";

const supportedWallets = [
  metamaskWallet({ recommended: true }),
  coinbaseWallet({ recommended: true }),
  walletConnect(),
  rainbowWallet(),
  trustWallet()
];
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export default function Web3Provider({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ThirdwebProvider
      activeChain={Meter}
      supportedChains={[Meter, MeterTestnet]}
      supportedWallets={supportedWallets}
      autoConnect={true}
      clientId={clientId}
      dAppMeta={{
        name: "ThirdTube",
        description: "ThirdTube is a decentralized video sharing platform.",
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
        isDarkMode: true
      }}
    >
      {mounted && children}
    </ThirdwebProvider>
  );
}
