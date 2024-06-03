import { frames } from "../ocs";
import { transaction } from "frames.js/core";
import { encodeFunctionData, parseAbi } from "viem";

export const POST = frames(async (ctx) => {
  if (!ctx.message) {
    throw new Error("No message");
  }
  const parsedAbi = parseAbi(["function safeMint(address _to)"]);
 
  const nftAddress = "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e";
  const myCalldata = encodeFunctionData({
    abi: parsedAbi,
    functionName: "safeMint",
    args: ["0xf5715961C550FC497832063a98eA34673ad7C816"],
  });
  
  return transaction({
    chainId: "eip155:137",
    method: "eth_sendTransaction",
    params: {
      abi: parsedAbi,
      to: nftAddress,
      data: myCalldata,
    },
  });
});