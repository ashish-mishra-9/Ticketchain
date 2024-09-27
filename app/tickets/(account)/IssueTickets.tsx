import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Divide, Loader2 } from "lucide-react";
import React, { useState } from "react";
import IssueInputField from "./IssueInputField";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types/user";
import "dotenv/config";
import { Ticket } from "@/lib/types/ticket";
import ShortUniqueId from "short-unique-id";
import { issueTicket } from "@/lib/contract/functions/IssueTicket";

import { createProvider } from "@/lib/contract/CreateProvider";
import { toast } from "sonner";
import { Contract } from "ethers";
import { getSigner } from "@/lib/contract/getSigner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Label } from "@/components/ui/label";

const IssueTickets = async ({
  user,
  contract,
}: {
  user: User;
  contract: Contract;
}) => {
  let contractOwner = process.env.NEXT_PUBLIC_CONTRACT_OWNER;
  let trainName = "";
  let start = "";
  let startTime = "";
  let end = "";
  let endTime = "";
  let price = 0;
  let to = "";

  const signer = await getSigner(window.ethereum!);
  const address = await signer.getAddress();

  return (
    <Card className="w-2/3 ml-2">
      <CardHeader className={cn("flex flex-col")}>
        <CardTitle>Issue Tickets</CardTitle>
        <CardDescription>Issue tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <Separator />
        {contractOwner == undefined ||
        contractOwner.toLowerCase() != address.toLowerCase() ? (
          <div className="flex flex-col justify-center items-center h-[70vh] w-full">
            <h2>Not Available</h2>
          </div>
        ) : (
          <div className="overflow-y-auto h-[70vh]">
            {
              <div className="w-2/3 flex flex-col  pl-2 pt-4 pb-4">
                <Label>Train</Label>
                <Select
                  onValueChange={(value) => {
                    trainName = value;
                  }}
                >
                  <SelectTrigger className="w-[180px] border rounded">
                    <SelectValue placeholder="Select a Train" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Train A">A</SelectItem>
                    <SelectItem value="Train B">B</SelectItem>
                    <SelectItem value="Train C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
            {IssueInputField(
              {
                lable: "Start Destination",
                placeholder: "Dhanbad",
                desc: "From where the ticket is valid",
              },
              (e) => {
                start = e;
              }
            )}
            {IssueInputField(
              {
                lable: "Start Time",
                placeholder: "12/05/2024 11:00",
                desc: "Time of trains arrival at start destination",
              },
              (e) => {
                startTime = e;
              }
            )}
            {IssueInputField(
              {
                lable: "End Destination",
                placeholder: "New Delhi",
                desc: "Till where the ticket is valid",
              },
              (e) => {
                end = e;
              }
            )}
            {IssueInputField(
              {
                lable: "End Time",
                placeholder: "05/12/2024 17:59",
                desc: "Time of trains arrival at end destination",
              },
              (e) => {
                endTime = e;
              }
            )}

            {IssueInputField(
              {
                lable: "Issued to",
                placeholder: "e12Cb256....",
                desc: "Public key to whom the ticket is issued",
              },
              (e) => {
                to = e;
              }
            )}
            {IssueInputField(
              {
                lable: "Price(₹)",
                placeholder: "500",
                desc: "Price at which the ticket is issued",
              },
              (e) => {
                price = Number(e);
              }
            )}
            <Button
              onClick={() => {
                if (
                  to.length == 0 ||
                  price == 0 ||
                  start.length == 0 ||
                  end.length == 0 ||
                  trainName.length == 0
                ) {
                  toast("Error", {
                    description: "Fields were empty",
                  });
                  return;
                }
                const uid = new ShortUniqueId({ length: 10 });
                let ticket: Ticket = {
                  id: uid.rnd(),
                  trainName: trainName,
                  originalCost: price,
                  start: start,
                  startTime: moment(startTime).unix(),
                  end: end,
                  endTime: moment(endTime).unix(),
                };
                console.log(ticket);

                toast("Issue Ticket", {
                  description:
                    "The request has been sent to the blockchain. Please wait for confirmation",
                });
                issueTicket(ticket, to, contract)
                  .then((ticket) => {
                    console.log("added to bc" + ticket);
                    toast.success("Ticket Issued");
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("some error occurred");
                  });
              }}
            >
              {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
              Issue Ticket
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IssueTickets;
