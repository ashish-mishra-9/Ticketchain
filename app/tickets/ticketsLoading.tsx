import { Loader2 } from "lucide-react";
import React from "react";

const TicketsLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <Loader2 className="animate-spin h-5" />
      <p className="text-black">Loading ...</p>
    </div>
  );
};

export default TicketsLoading;
