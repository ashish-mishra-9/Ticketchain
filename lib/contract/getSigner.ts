import { providers } from "ethers";

export async function getSigner(
  extProvider: providers.ExternalProvider
): Promise<providers.JsonRpcSigner> {
  const p = new providers.Web3Provider(extProvider);
  await p.send("eth_requestAccounts", []);
  return p.getSigner();
}
