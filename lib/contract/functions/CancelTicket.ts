import { Contract } from "ethers";

export async function cancelTicket(
  ticketId: string,
  contract: Contract
): Promise<string> {
  let tx = await contract.cancelTicket(ticketId);
  await tx.wait();
  return ticketId;
}
