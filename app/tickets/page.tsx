"use client";

import React, { useEffect, useState } from "react";
import "dotenv/config";

import { Ticket } from "@/lib/types/ticket";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import TicketTableHeader from "./ticketTableHeader";
import TicketRow from "./ticketRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import MyTicketRow from "./MyTicketRow";
import MyAccount from "./(account)/myAccount";
import { User } from "@/lib/types/user";
import { Contract, errors, providers } from "ethers";
import { initializeContractWithWeb3 } from "@/lib/contract/contract";
import { createProvider } from "@/lib/contract/CreateProvider";
import { getTicketForUser } from "@/lib/contract/functions/GetTicketsForUser";
import { getCancelledTickets } from "@/lib/contract/functions/GetCancelledTickets";
import TicketsLoading from "./ticketsLoading";
import { AlertDialog } from "@/components/ui/alert-dialog";
import ContractErrorPage from "./ContractErrorPage";

let name = "";
let sk = "";
let pk = "";

declare global {
  interface Window {
    ethereum?: providers.ExternalProvider;
  }
}

const Tickets = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [tickets, setTickets] = useState<Ticket[]>(Array<Ticket>());
  const [allTickets, setAllTickets] = useState<Ticket[]>(Array<Ticket>());
  const [ticketLoading, setTicketLoading] = useState<boolean>(false);
  const [allLoading, setAllLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
  
    console.log("effect triggered");

    let user: User = {
      name: "",
      publicKey: "",
    };
    setUser(user);
    let provider = createProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL!);

    try {
      initializeContractWithWeb3(
        provider,
        window.ethereum!,
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!
      ).then((c) => {
        setContract(c);
        fetchMyTickets(
          c,
          () => {
            setTicketLoading(true);
          },
          (data) => {
            setTicketLoading(false);
            setTickets(data);
          },
          (err) => {
            setTicketLoading(false);
          }
        );
        fetchAllTickets(
          user,
          c,
          () => {
            setAllLoading(true);
          },
          (data) => {
            setAllLoading(false);
            setAllTickets(data);
          },
          (err) => {
            setAllLoading(false);
          }
        );
      });
    } catch (e) {
      setContract(undefined);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("something went wrong");
      }
      console.log(e);
    }
  }, []);

  if (user == undefined) {
    return (
      <main>
        <TicketsLoading />
      </main>
    );
  }

  if (error != undefined) {
    return (
      <main>
        <ContractErrorPage error={error} />
      </main>
    );
  }

  contract!;

  return (
    <main className="pr-10 pl-10 pt-2 w-[100vw]">
      <Tabs defaultValue="tickets" className="mt-8">
        <div className="flex justify-between">
          <TabsList className="w-[30vw]">
            <TabsTrigger value="tickets" className="w-1/3">
              Tickets
            </TabsTrigger>
            <TabsTrigger value="my tickets" className="w-1/3">
              My Tickets
            </TabsTrigger>
            <TabsTrigger value="account" className="w-1/3">
              Account
            </TabsTrigger>
          </TabsList>
          <Input
            placeholder="search train"
            className="w-[30vw] mr-2"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <TabsContent value="tickets">
          <AlertDialog>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                fetchAllTickets(
                  user,
                  contract!,
                  () => {
                    setAllLoading(true);
                  },
                  (data) => {
                    setAllLoading(false);
                    setAllTickets(data);
                  },
                  (err) => {
                    setAllLoading(false);
                  }
                );
              }}
            >
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
            {allLoading || contract == undefined ? (
              <TicketsLoading />
            ) : (
              <Table>
                <TableHeader>
                  <TicketTableHeader />
                </TableHeader>
                {allTickets.length == 0 ? (
                  <p>No Tickets</p>
                ) : (
                  <TableBody>
                    {allTickets
                      .filter((t) => {
                        return (
                          search.length == 0 || t.trainName.includes(search)
                        );
                      })
                      .map((ticket) => TicketRow({ ticket, user, contract }))}
                  </TableBody>
                )}
              </Table>
            )}
          </AlertDialog>
        </TabsContent>
        <TabsContent value="my tickets">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => {
              fetchMyTickets(
                contract!,
                () => {
                  setTicketLoading(true);
                },
                (data) => {
                  setTicketLoading(false);
                  setTickets(data);
                },
                (err) => {
                  setTicketLoading(false);
                }
              );
            }}
          >
            <RefreshCwIcon className="h-4 w-4" />
          </Button>
          {ticketLoading || contract == undefined ? (
            <TicketsLoading />
          ) : (
            <Table>
              <TableHeader>
                <TicketTableHeader />
              </TableHeader>
              <TableBody>
                {tickets
                  .filter((t) => {
                    return search.length == 0 || t.trainName.includes(search);
                  })
                  .map((ticket) => MyTicketRow({ ticket, user, contract }))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
        {contract != undefined ? (
          <TabsContent value="account">
            {MyAccount({ user, contract })}
          </TabsContent>
        ) : (
          <p>no contract</p>
        )}
      </Tabs>
    </main>
  );
};

export default Tickets;

function fetchMyTickets(
  newContract: Contract,
  preUpdate: () => void,
  successUpdate: (data: Ticket[]) => void,
  failureUpdate: (err: any) => void
) {
  preUpdate();
  console.log(newContract);
  getTicketForUser(newContract)
    .then((data) => {
      successUpdate(data);
      console.log(data);
    })
    .catch((err) => {
      failureUpdate(err);
      console.log("error: " + err);
    });
}

function fetchAllTickets(
  user: User,
  newContract: Contract,
  preUpdate: () => void,
  successUpdate: (data: Ticket[]) => void,
  failureUpdate: (err: any) => void
) {
  preUpdate();
  console.log(newContract);
  getCancelledTickets(newContract)
    .then((data) => {
      successUpdate(data);
      console.log(data);
    })
    .catch((err) => {
      failureUpdate(err);
      console.log("error: " + err);
    });
}
