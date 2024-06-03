import { Button } from "frames.js/next";
import { frames } from "./ocs";
 
const handleRequest = frames(async (ctx) => {
  
  return {
    image: "../1.png",
    buttons: [
      <Button key={1} action="post" target="/part1">Next</Button>,
      // <Button action="tx" target="/eoa" post_url="/">EOA transaction </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;
