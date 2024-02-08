import { NEXT_PUBLIC_URL } from "@/lib/constants";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Address, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import {
  createSmartAccountClient,
  PaymasterMode,
} from "@biconomy-devx/account";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.PRIVATE_KEY!;
const paymasterApiKey = process.env.PAYMASTER_API_KEY!;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY!,
  });

  if (!isValid) {
    return new NextResponse("Invalid Frame message", { status: 400 });
  }

  if (!message) {
    return new NextResponse("Invalid Frame message", { status: 400 });
  }

  const accountAddress = message.interactor.verified_accounts[0] as Address;
  const fid = message.interactor.fid;
  // send transaction
  const bundlerUrl =
    "https://bundler.biconomy.io/api/v2/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // Found at https://dashboard.biconomy.io

  //@ts-ignore
  const account = privateKeyToAccount(privateKey);
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(),
  });
  const eoa = client.account.address;
  console.log(`EOA address: ${eoa}, connected address ${accountAddress}`);

  // ------ 2. Create biconomy smart account instance
  const smartAccount = await createSmartAccountClient({
    signer: client,
    bundlerUrl,
    biconomyPaymasterApiKey: paymasterApiKey,
    index: fid,
  });
  
  const scwAddress = await smartAccount.getAccountAddress();
  console.log("SCW Address", scwAddress);

  const transaction = {
    to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    data: "0x1234",
    value: BigInt(0),
  };

  const userOpResponse = await smartAccount.sendTransaction(transaction, {
    paymasterServiceData: {
      mode: PaymasterMode.SPONSORED,
    },
  });
  const { transactionHash } = await userOpResponse.waitForTxHash();
  console.log("Transaction Hash", transactionHash);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `View Smart Account`,
          action: "post_redirect",
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/og?address=${scwAddress}&fid=${message.interactor.fid}&userOpHash=${transactionHash}`,
      post_url: `${NEXT_PUBLIC_URL}/api/etherscan`,
    }),
  );
}

export const dynamic = "force-dynamic";
