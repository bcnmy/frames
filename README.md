# Frames
This project is aimed at showcasing how to create a smart account using [Biconomy SDK](https://docs.biconomy.io/) within a frame.

**Simple Frame**

Access the simple frame at: https://frames.biconomy.io/simple

This frame provides a basic demonstration of button clicks that redirect users to the Biconomy documentation and dashboard.

**Smart Account creation frame**

Access the smart account creation frame at: https://frames.biconomy.io/account

This frame facilitates the creation of a smart account for a specified farcaster ID using a common signer. You can also access the newly created smart account through the link provided in the subsequent frame. The process utilizes the Biconomy paymaster to sponsor the transaction.

To use this template, you need to set the following environment variables:
- NEYNAR_API_KEY: API key for interacting with Frames messages.
- PRIVATE_KEY: Private key of the common signer. Alternatively, you can use your own signer.
- PAYMASTER_API_KEY: Biconomy paymaster API key for deploying the smart account. You can obtain your Paymaster URL from the Biconomy [Dashboard](https://dashboard.biconomy.io/).

Use the following commands to run the application:

```bash
yarn install
yarn run dev
```

This will start the application and you can access it in your web browser at http://localhost:3000 (or a different port if specified).

**Additional Details**

- The file src/app/account/page.tsx is responsible for rendering the initial frame (f1) when the frame is loaded.
- It calls the `/api/account` API to create the smart account, as specified in the account routes. This contains the code for creating the smart account using the SDK.
- `f1` returns the frame `f2`, which includes details about the newly created smart account. The file src/app/og/route.tsx is used to render f2.