import { Ticket } from "@/lib/types/ticket";
import { BigNumber, Contract } from "ethers";

export async function getCancelledTickets(
  contract: Contract
): Promise<Array<Ticket>> {
  let data: Array<any> = await contract.getAllCancelledTickets();
  let list: Ticket[] = [];

  data.forEach((item) => {
    if (item[0] != "") {
      const t: Ticket = {
        id: item[0],
        trainName: item[1],
        originalCost: Number((item[6] as BigNumber)._hex),
        start: item[2],
        startTime: Number((item[3] as BigNumber)._hex),
        end: item[4],
        endTime: Number((item[5] as BigNumber)._hex),
      };

      list.push(t);
    }
  });

  return list;
}
