import { providers, Wallet } from "ethers";

export function createWallet(provider: providers.JsonRpcProvider, sk: string) {
  return new Wallet(sk, provider);
}
