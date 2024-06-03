import { fetchMetadata } from "frames.js/next";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useConfig } from "wagmi";

export async function generateMetadata() {

  return {
    title: "My Page",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        "/ocs",
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      )
    ),
  };
}
 
export default function Page() {
  return <span>My existing page</span>;
}