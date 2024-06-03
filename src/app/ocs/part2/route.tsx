import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../3.png", 
    buttons: [
      <Button key={1} action="post" target="/part1">
      Go back
      </Button>,
       <Button key={2} action="post" target="/part3">
       Next
       </Button>
    ],
  }
});
