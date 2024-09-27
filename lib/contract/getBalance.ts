import { providers, utils } from "ethers";

export async function getBalance(
  address: string,
  provider: providers.JsonRpcProvider
): Promise<string> {
  const bal = await provider.getBalance(address);
  return utils.formatEther(bal);
}
