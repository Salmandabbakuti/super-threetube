import { Inter } from "next/font/google";
import Web3Provider from "./components/Web3Provider";
import SiteLayout from "./components/SiteLayout";
import { SearchProvider } from "./contexts/SearchContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ThirdTube",
  description: "A decentralized video sharing platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <SearchProvider>
            <SiteLayout>{children}</SiteLayout>
          </SearchProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
