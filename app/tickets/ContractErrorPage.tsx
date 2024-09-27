import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ContractErrorPage = ({ error }: { error: string }) => {
  const route = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className="text-black">Contract Could not be Initialized</h1>
      <p className="text-black">{error}</p>
      <Button
        onClick={() => {
          route.back();
        }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default ContractErrorPage;
