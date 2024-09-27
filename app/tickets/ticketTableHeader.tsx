import { TableHead, TableRow } from "@/components/ui/table";
import React from "react";

const TicketTableHeader = () => {
  return (
    <TableRow>
      <TableHead>Train</TableHead>
      <TableHead>start</TableHead>
      <TableHead>time</TableHead>
      <TableHead>end</TableHead>
      <TableHead>time</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  );
};

export default TicketTableHeader;
