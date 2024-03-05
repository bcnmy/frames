import { NEXT_PUBLIC_URL } from "@/lib/constants";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { Address, Hex,  createWalletClient, encodeFunctionData, http, parseAbi, } from "viem";
import { sepolia } from "viem/chains";
import {
  createSmartAccountClient,
  PaymasterMode,
} from "@biconomy/account";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.PRIVATE_KEY!;
const paymasterApiKey = process.env.PAYMASTER_API_KEY!;

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("1")
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY!,
  });
  console.log("2", isValid, message)
  if (!isValid) {
    return new NextResponse("Invalid Frame message", { status: 400 });
  }

  if (!message) {
    return new NextResponse("Invalid Frame message", { status: 400 });
  }

  const accountAddress = message.interactor.verified_accounts[0] as Address;
  const fid = message.interactor.fid;
  console.log("3", accountAddress, fid)
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

  const nftAddress = "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e";
  const parsedAbi = parseAbi(["function safeMint(address _to)"]);
  const nftData = encodeFunctionData({
    abi: parsedAbi,
    functionName: "safeMint",
    args: [scwAddress as Hex],
  });


  const userOpResponse = await smartAccount.sendTransaction({
      to: nftAddress,
      data: nftData,
    }, 
    {
      paymasterServiceData: {
        mode: PaymasterMode.SPONSORED,
      },
    }
  );
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
