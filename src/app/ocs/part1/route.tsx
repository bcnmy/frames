import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../2.jpeg", // foo: bar
    buttons: [
      <Button key={1} action="post" target="/part2">
      Next
      </Button>,
      <Button key={2} action="post" target="/">
      Go back
      </Button>
    ],
  }
});
