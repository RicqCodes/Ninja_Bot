import Wallet from "@/components/page/wallet";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col p-6 h-screen">
      <div className="flex w-full h-full">{<Wallet />}</div>
    </div>
  );
};

export default page;
