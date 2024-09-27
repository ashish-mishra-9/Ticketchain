"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "dotenv/config";
import { createProvider } from "@/lib/contract/CreateProvider";
import React, { useEffect, useState } from "react";
import BlockChainDataRow from "./blockChainDataRow";
import { Button } from "@/components/ui/button";

const BlockChainData = () => {
  const [block, setBlock] = useState<string | undefined>("");
  const [bal, setBal] = useState<string | undefined>(undefined);

  
  if (block == undefined)
    return (
      <Card className="mt-2 h-1/2">
        <CardHeader>
          <CardTitle>BlockChain</CardTitle>
          <CardDescription>BlockChain</CardDescription>
        </CardHeader>
        <CardContent>
          <h1>Loading ..</h1>
        </CardContent>
      </Card>
    );

  return (
    <Card className="mt-2 h-1/2">
      <CardHeader>
        <CardTitle>BlockChain</CardTitle>
        <CardDescription>BlockChain</CardDescription>
      </CardHeader>
      <CardContent>
        {BlockChainDataRow({ lable: "Blocks", value: block })}
        <Button
          onClick={() => {
            let provider = createProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL!);
            provider
              .getBlockNumber()
              .then((blockNumber) => {
                setBlock(blockNumber.toString());
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Load
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlockChainData;
