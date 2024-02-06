import { Metadata } from "next";

const TITLE = "frames.biconomy.io";
const DESCRIPTION =
  "The ultimate toolkit to leverage smart contract wallets & build custom transaction journeys.";
const URL = "https://frames.biconomy.io";

export const METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: TITLE,
    images: [
      {
        url: `${URL}/opengraph.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};
