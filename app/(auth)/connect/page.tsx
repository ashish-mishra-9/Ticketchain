"use client";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createProvider } from "@/lib/contract/CreateProvider";
import { getBalance } from "@/lib/contract/getBalance";
import "dotenv/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSigner } from "@/lib/contract/getSigner";
import { toast } from "sonner";
import { LucideBlocks, Mail } from "lucide-react";
import Image from "next/image";
import x from "./metamask-icon.webp";

const Connect = () => {
  const [name, setName] = useState<string>("");
  const [pk, setPk] = useState<string>("");
  const [sk, setSk] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    let name = localStorage.getItem("name");
    let pk = localStorage.getItem("pk");
    let sk = localStorage.getItem("sk");
    if (name?.length != 0 && pk?.length != 0 && sk?.length != 0) {
      router.push("/tickets");
    }
  }, []);

  return (
    <main className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <Card className="w-[40vw] flex flex-col items-center justify-evenly pt-5 pb-5">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>Create a connection to your wallet</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <Avatar>
            <AvatarImage
              className="h-[100px] w-[100px]"
              src=".\ethereum.png"
              alt="avatar"
            ></AvatarImage>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Button
            className="w-[250px] mt-4"
            onClick={() => {
              if (window.ethereum == undefined) {
                toast.error("Error", {
                  description: "No injected provider found",
                });
                return;
              }
              getSigner(window.ethereum)
                .then((signer) => {
                  router.push("/tickets");
                })
                .catch((err) => {
                  toast.error("Error", {
                    description: "Could not find the signer",
                  });
                });
            }}
          >
            Connect
          </Button>
        </CardContent>
        <CardFooter>
          <Button variant={"link"} asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Connect;
