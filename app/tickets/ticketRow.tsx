import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Ticket } from "@/lib/types/ticket";
import { cn } from "@/lib/utils";
import React from "react";
import BuyAlertDialog from "./BuyAlertDialog";
import { User } from "@/lib/types/user";
import { Contract } from "ethers";
import { timestampToDateString } from "@/lib/helper/date_utils";

const TicketRow = ({
  ticket,
  user,
  contract,
}: {
  ticket: Ticket;
  user: User;
  contract: Contract;
}) => {
  return (
    <AlertDialog>
      <TableRow key={ticket.id}>
        <TableCell className="font-medium">{ticket.trainName}</TableCell>
        <TableCell>{ticket.start}</TableCell>
        <TableCell>{timestampToDateString(ticket.startTime)}</TableCell>
        <TableCell>{ticket.end}</TableCell>
        <TableCell>{timestampToDateString(ticket.endTime)}</TableCell>
        <TableCell>{`₹ ${ticket.originalCost}`}</TableCell>
        <TableCell>
          <AlertDialogTrigger asChild>
            <Button>Buy</Button>
          </AlertDialogTrigger>
          <BuyAlertDialog ticket={ticket} user={user} newContract={contract} />
        </TableCell>
      </TableRow>
    </AlertDialog>
  );
};

export default TicketRow;
