import { providers } from "ethers";

export function createProvider(url : string): providers.JsonRpcProvider {
  return new providers.JsonRpcProvider(url);
}


