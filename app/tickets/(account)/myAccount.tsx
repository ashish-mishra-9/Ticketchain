import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/types/user";
import React from "react";
import AccountDataRow from "./accountDataRow";
import { cn } from "@/lib/utils";
import BlockChainData from "./blockChainData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IssueTickets from "./IssueTickets";
import { Contract } from "ethers";

const myAccount = ({ user, contract }: { user: User; contract: Contract }) => {
  console.log(user);
  return (
    <main className="flex  h-screen">
      <div className="flex flex-col w-1/3">
        <Card className={cn("h-1/2")}>
          <CardHeader className={cn("flex flex-col")}>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col ">
            {AccountDataRow({ lable: "name", value: user.name })}
            {AccountDataRow({ lable: "publicKey", value: user.publicKey })}
            {AccountDataRow({
              lable: "privateKey",
              value: "*******************",
            })}
            <div className="w-full mt-4 flex">
              <Button
                className="w-1/2"
                variant={"default"}
                asChild
                onClick={() => {
                  localStorage.setItem("name", "");
                  localStorage.setItem("pk", "");
                  localStorage.setItem("sk", "");
                }}
              >
                <Link href="/">Leave</Link>
              </Button>
              <Button
                asChild
                className="w-1/2 ml-2"
                variant={"outline"}
                onClick={() => {
                  localStorage.setItem("name", "");
                  localStorage.setItem("pk", "");
                  localStorage.setItem("sk", "");
                }}
              >
                <Link href="/connect">Switch</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <BlockChainData />
      </div>
      {IssueTickets({ user, contract })}
    </main>
  );
};

export default myAccount;
