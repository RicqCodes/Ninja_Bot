import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { LuAlertTriangle, LuCopy } from "react-icons/lu";
import QRCode from "react-qr-code";
import Button from "./ui/Button";

import { shortAddress } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import Link from "next/link";

interface Props {
  handleOffModal: () => void;
}

const Deposit: React.FC<Props> = ({ handleOffModal }) => {
  const { wallet } = useWallet();

  const copyToClipboard = useCallback((wallet: string): void => {
    try {
      navigator.clipboard.writeText(wallet);
      toast.success("Wallet address copied to clipboard");
    } catch (err) {
      toast.error("Could not copy to clipboard");
    }
  }, []);

  return (
    <>
      <div className="w-full p-6 flex justify-between pt-[2.8rem]">
        <h2 className="font-sans text-2xl font-bold w-full text-center">
          Your Public Address
        </h2>
      </div>
      <div className="flex gap-4 p-6 flex-col justify-center">
        <div className="flex flex-col w-full items-center">
          <div
            className="max-w-[20rem] w-full bg-primary-color flex items-center justify-center flex-col p-[1.4rem] rounded-lg"
            onClick={() => copyToClipboard(wallet!)}
          >
            <QRCode
              size={180}
              bgColor="white"
              fgColor="black"
              value={wallet!}
            />
          </div>
          <div className="flex gap-6 items-center">
            <p className="font-mono">{shortAddress(wallet)}</p>
            <LuCopy onClick={() => copyToClipboard(wallet!)} />
          </div>
        </div>
        <div className="flex gap-[1rem] items-center p-4 rounded-md border bg-secondary">
          <div>
            <LuAlertTriangle />
          </div>
          <p className="text-black font-raleway">
            Please make sure you are sending assets on our{" "}
            <Link href="">supported networks</Link>
          </p>
        </div>
        <div className="w-full pt-6">
          <Button
            variant="accent"
            type="button"
            onClick={() => handleOffModal()}
            className="w-full p-8 text-lg"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

export default Deposit;
