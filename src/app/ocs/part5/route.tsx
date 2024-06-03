import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../6.png", 
    buttons: [
      <Button key={1} action="post" target="/part4">
      Go back
      </Button>,
      <Button key={2} action="link" target="https://tally.so/r/wQAgVl">
      Register now
      </Button>
    ],
  }
});
