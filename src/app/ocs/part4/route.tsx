import { frames } from "../ocs";
import { Button } from "frames.js/core";

export const POST = frames(async (ctx) => {
  
  return{
    image: "../5.jpeg", // foo: bar
    buttons: [
      <Button action="post" target="/part5">
      Next
      </Button>,
      <Button action="post" target="/part3">
      Go back
      </Button>
    ],
  }
});
