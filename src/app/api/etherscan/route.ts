import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Hash, createPublicClient } from "viem";
import { createSmartAccountClient } from "@biconomy-devx/account";
import { Address, createWalletClient, http, Hex } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.PRIVATE_KEY! as Hex;
const publicClient = createPublicClient({
  transport: http("https://rpc.ankr.com/eth_sepolia"),
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY!,
  });

  if (isValid === false) {
    return new NextResponse("Invalid Frame message", { status: 400 });
  }

  if (!message) {
    return new NextResponse("Invalid Frame message", { status: 400 });
  }
  const fid = message.interactor.fid;
  const account = privateKeyToAccount(privateKey);
  const bundlerUrl =
    "https://bundler.biconomy.io/api/v2/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // Found at https://dashboard.biconomy.io

  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });
  const smartAccount = await createSmartAccountClient({
    signer: client,
    bundlerUrl,
    index: fid,
  });
  const scwAddress = await smartAccount.getAccountAddress();

  return NextResponse.redirect(
    `https://sepolia.etherscan.io/address/${scwAddress}`,
    { status: 302 },
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
