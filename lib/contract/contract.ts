import { Contract, Wallet, providers } from "ethers";
import { abi, newAbi } from "./abi";
import { createWallet } from "./CreateWallet";
import { getSigner } from "./getSigner";

function getContract(
  provider: providers.JsonRpcProvider,
  contractAddress: string
): Contract {
  return new Contract(contractAddress, newAbi, provider);
}

function attachWallet(contract: Contract, wallet: Wallet): Contract {
  return contract.connect(wallet);
}

function initializeContract(
  provider: providers.JsonRpcProvider,
  contractAddress: string,
  sk: string
): Contract {
  const contract = getContract(provider, contractAddress);
  const wallet = createWallet(provider, sk);
  const contractWithWallet = attachWallet(contract, wallet);
  return contractWithWallet;
}

export async function initializeContractWithWeb3(
  provider: providers.JsonRpcProvider,
  extProvider: providers.ExternalProvider,
  contractAddress: string
): Promise<Contract> {
  const contract = getContract(provider, contractAddress);
  const signer = await getSigner(extProvider);
  const contractWithSigner = contract.connect(signer);
  return contractWithSigner;
}


