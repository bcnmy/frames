import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { privateKeyToBiconomySmartAccount } from "permissionless/accounts";
import { Hash, createPublicClient, http } from "viem";

const privateKey = process.env.PRIVATE_KEY!;
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
  const account = await privateKeyToBiconomySmartAccount(publicClient, {
    privateKey: privateKey as Hash,
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    index: BigInt(fid)
  });

  return NextResponse.redirect(
    `https://sepolia.etherscan.io/address/${account.address}`,
    { status: 302 },
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
