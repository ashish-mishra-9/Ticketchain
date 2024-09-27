import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { assignCancelledTicket } from "@/lib/contract/functions/AssignCancelledTicket";
import { getSigner } from "@/lib/contract/getSigner";

import { Ticket } from "@/lib/types/ticket";
import { User } from "@/lib/types/user";
import { sign } from "crypto";

import { Contract } from "ethers";
import React from "react";
import { toast } from "sonner";

const BuyAlertDialog = ({
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
          This action cannot be undone. This ticket will be added to your
          account.You may incur charges.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => {
            getSigner(window.ethereum!)
              .then((signer) => {
                signer
                  .getAddress()
                  .then((address) => {
                    toast("Buy Ticket", {
                      description:
                        "The request has been sent to the Wallet.Please wait for confirmation.",
                    });
                    console.log("signer address : " + address);
                    buyTicket(ticket, address, newContract);
                  })
                  .catch((error) => {
                    console.log("signer address error : " + error.message);
                    toast.error("Error", {
                      description: "Could not fetch account account address",
                    });
                  });
              })
              .catch((error) => {
                toast.error("Error", {
                  description: "Could not fetch account account.",
                });
              });
          }}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default BuyAlertDialog;

function buyTicket(ticket: Ticket, address: string, newContract: Contract) {
  assignCancelledTicket(ticket.id, address, newContract)
    .then((id) => {
      console.log("Bought");
      toast.success("Ticket Bought");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error", {
        description: "There was an error buying your ticket. Plase try later.",
      });
    });
}
