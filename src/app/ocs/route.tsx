/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./ocs";
 
const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
        <Button action="post" target="/">
        Go back
      </Button>
      ],
    };
  }
  
  return {
    image: "../1.jpeg",
    buttons: [
      <Button action="post" target="/part1">Next</Button>,
      // <Button action="tx" target="/eoa" post_url="/">EOA transaction </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;