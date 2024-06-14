import { Inter } from "next/font/google";
import Web3Provider from "./components/Web3Provider";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ThreeTube",
  description: "A decentralized video sharing platform"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <SiteLayout>{children}</SiteLayout>
        </Web3Provider>
      </body>
    </html>
  );
}
