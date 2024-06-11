"use client";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function SiteLayout({ children }) {
  return (
    <div>
      <header>
        <h1>ThreeTube</h1>
        <ConnectWallet
          style={{ marginRight: "10px" }}
          theme={"dark"} // light | dark
          switchToActiveChain={true}
          hideTestnetFaucet={false}
          modalSize={"wide"} // compact | wide
          termsOfServiceUrl="https://example.com/terms"
          privacyPolicyUrl="https://example.com/privacy"
        />
      </header>
      <main>{children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
