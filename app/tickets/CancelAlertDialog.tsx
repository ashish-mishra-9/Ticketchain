import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cancelTicket } from "@/lib/contract/functions/CancelTicket";
import { Ticket } from "@/lib/types/ticket";
import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import { Contract } from "ethers";
import React from "react";
import { toast } from "sonner";

const CancelAlertDialog = ({
  ticket,
  user,
  newContract,
}: {
  ticket: Ticket;
  user: User;
  newContract: Contract;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently cancel your
          ticket.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            toast("Cancel Ticket", {
              description:
                "The request has been sent to the blockchain. Plase wait for confirmation.",
            });
            cancelTicket(ticket.id, newContract)
              .then(() => {
                console.log("Cancelled");
                toast("Ticket cancelled", {
                  description: `Your ticket with id ${ticket.id} was cancelled`,
                });
              })
              .catch((err) => {
                console.log(err);
                toast("Error", {
                  description:
                    "There was an error cancelling your ticket. Plase try later.",
                });
              });
          }}
          className={cn("bg-red-500 hover:bg-red-700")}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default CancelAlertDialog;
