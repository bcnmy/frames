import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const NEXT_PUBLIC_URL = "https://www.biconomy.io";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Click me",
    },
  ],
  image: `${NEXT_PUBLIC_URL}/biconomy_orange_centred.png`,
});

export const metadata: Metadata = {
  title: "biconomy.io",
  description: "Account Abstraction",
  openGraph: {
    title: "biconomy.io",
    description: "Account Abstraction",
    images: [`${NEXT_PUBLIC_URL}/biconomy_orange_centred.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>biconomy.io</h1>
    </>
  );
}
