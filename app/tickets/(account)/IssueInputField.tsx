import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

const IssueInputField = (
  {
    lable,
    placeholder,
    desc,
  }: {
    lable: string;
    placeholder: string;
    desc: string;
  },
  onChange: (e: string) => void
) => {
  return (
    <div className="w-2/3 flex flex-col  pl-2 pt-4 pb-4">
      <Label htmlFor={`input-${lable}`}>{lable}</Label>
      <Input
        placeholder={placeholder}
        className="mt-3"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <CardDescription className={cn("mt-2")}>{desc}</CardDescription>
    </div>
  );
};

export default IssueInputField;
