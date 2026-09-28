"use client";

export { WalletConnect } from "./wallet/WalletConnect";
export default function WalletConnectDefault() {
  const { WalletConnect } = require("./wallet/WalletConnect");
  return <WalletConnect />;
}
