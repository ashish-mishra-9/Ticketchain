import React from "react";

const BlockChainDataRow = ({
  lable,
  value,
}: {
  lable: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between mt-2 mb-2">
      <h2>{lable}</h2>
      <p>{value}</p>
    </div>
  );
};

export default BlockChainDataRow;
