import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../5.png",
    buttons: [
      <Button key={1} action="post" target="/part3">
      Go back
      </Button>,
      <Button key={2} action="post" target="/part5">
      Next
      </Button>
    ],
  }
});
