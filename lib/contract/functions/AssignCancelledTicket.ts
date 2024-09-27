import { Contract } from "ethers";

export async function assignCancelledTicket(
  ticketId: string,
  to: string,
  contract: Contract
): Promise<string> {
  
  const tx = await contract.assignCancelledTicket(ticketId, to);
  await tx.wait();
  return ticketId;
}
