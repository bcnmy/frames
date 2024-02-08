# Frames
This project is aimed at creating a frame template to deploy a smart account using [Biconomy SDK](https://docs.biconomy.io/).

**Simple Frame**

link: https://frames.biconomy.io/simple

A simple frame to showcase the button clicks that redirects you to the biconomy documentation and dashboard.

**Smart Account creation frame**

link: https://frames.biconomy.io/account

This frame creates a smart account for a given farcaster id using a common signer. you can also access the created smart account with the link provided in the next frame. It uses biconomy paymaster to sponsor the transaction.

This template requires following environment variables.
- NEYNAR_API_KEY: the API key to interact with frames messages.
- PRIVATE_KEY: private key of the common signer. you can also use a signer of your own.
- PAYMASTER_API_KEY: Biconomy paymaster API key to deploy the smart account. You can get your Paymaster URL from the Biconomy [Dashboard](https://dashboard.biconomy.io/).

Use the following commands to run it.

```bash
yarn install
yarn run dev
```

This will start the application and you can access it in your web browser at http://localhost:3000 (or a different port if specified).

**Further details**

- src/app/account/page.tsx is used to render the first frame f1 when the frame is loaded.
- It calls the `/api/account` API to create the smart account, which is mentioned in the account routes. It contains the code to create smart account using the sdk.
- f1 returns the frame f2, which contains the details about the new smart account created. src/app/og/route.tsx is used to render the f2.


