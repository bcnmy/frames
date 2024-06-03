import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../2.jpeg", // foo: bar
    buttons: [
      <Button action="post" target="/part2">
      Next
      </Button>,
      <Button action="post" target="/">
      Go back
      </Button>
    ],
  }
});
