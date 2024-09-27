import { Ticket } from "@/lib/types/ticket";
import { Contract, ContractTransaction } from "ethers";

export async function issueTicket(
  ticket: Ticket,
  to: string,
  contract: Contract
): Promise<Ticket> {
  let tx: ContractTransaction = await contract.issueTicket(
    ticket.id,
    ticket.trainName,
    ticket.start,
    ticket.startTime,
    ticket.end,
    ticket.endTime,
    ticket.originalCost,
    to
  );
  await tx.wait();
  return ticket;
}
