import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Ticket } from "@/lib/types/ticket";
import React from "react";
import CancelAlertDialog from "./CancelAlertDialog";
import { User } from "@/lib/types/user";
import { Contract } from "ethers";
import moment from "moment";
import { timestampToDateString } from "@/lib/helper/date_utils";

const MyTicketRow = ({
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
            <Button variant={"destructive"}>Cancel</Button>
          </AlertDialogTrigger>
        </TableCell>
      </TableRow>
      <CancelAlertDialog ticket={ticket} user={user} newContract={contract} />
    </AlertDialog>
  );
};

export default MyTicketRow;
