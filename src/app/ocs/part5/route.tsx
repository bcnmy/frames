import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../6.jpeg", // foo: bar
    buttons: [
      <Button key={1} action="post" target="/part4">
      Go back
      </Button>
    ],
  }
});
