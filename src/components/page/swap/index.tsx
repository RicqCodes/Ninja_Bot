import Button from "@/components/ui/Button";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineSwapCalls } from "react-icons/md";

const Swap = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <header className="w-full flex gap-6 items-center justify-between fixed top-0 left-0 backdrop-blur-lg bg-accent_bg px-6 pt-2 h-20 z-10">
        <h1 className="text-2xl text-white font-bold">Swap</h1>
      </header>
      <div className="w-full flex flex-col gap-6 pt-24 relative">
        <div className="relative w-full bg-accent_fff h-48 rounded-[2rem] p-4">
          <div className="absolute top-[-2rem] left-[50%] translate-x-[-50%] rounded-bl-[2.6rem] rounded-br-[2.6rem] rounded-tl-[1rem] flex gap-4 px-4 pt-8 pb-4 bg-accent_bg ">
            <Button
              variant="default"
              className="bg-accent_444 py-2 px-4 text-accent_000 rounded-3xl"
            >
              Half
            </Button>
            <Button
              variant="default"
              className="bg-accent_555 py-2 px-4 text-accent_000 rounded-3xl"
            >
              Max
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <h1 className="text-accent_000 font-sm pt-6">You pay</h1>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent_333 opacity-75"></div>
                <div className="flex items-center gap-1 opacity-75 font-light">
                  <p className="text-accent_000 font-semibold">USDT</p>
                  <IoIosArrowDown className="text-accent_000 text-xl" />
                </div>
              </div>
              <div className="flex gap-1 items-end">
                <p className="text-accent_000 text-2xl font-bold">300.00</p>
                <span className="text-accent_000 font-light text-sm">USDT</span>
              </div>
            </div>
          </div>
          <div className="w-full pt-5">
            <p className="text-accent_000 text-xs font-semibold">
              Balance 12,788.66
            </p>
          </div>
        </div>
        <div className="absolute w-[5.5rem] h-[5.5rem] p-2 rounded-full bg-accent_bg top-[50%] left-[50%] translate-x-[-50%] z-10">
          <div className="border-4 border-secondary w-full h-full rounded-full p-3">
            <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center">
              <MdOutlineSwapCalls className="text-accent_fff text-2xl" />
            </div>
          </div>
        </div>
        <div className="relative w-full bg-secondary h-48 rounded-[2rem] p-4 text-accent_fff">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <h1 className="font-sm pt-6">You Receive</h1>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent_333 opacity-75"></div>
                <div className="flex items-center gap-1 opacity-75 font-light">
                  <p className="font-semibold">BNB</p>
                  <IoIosArrowDown className="text-xl" />
                </div>
              </div>
              <div className="flex gap-1 items-end">
                <p className="text-2xl font-bold">1.37</p>
                <span className="font-light text-sm">BNB</span>
              </div>
            </div>
          </div>
          <div className="w-full pt-5">
            <p className="text-xs font-semibold">Balance 24.56</p>
          </div>
        </div>
      </div>
      <Button variant="outline" className="py-8 text-xl rounded-[2rem]">
        Swap
      </Button>
    </div>
  );
};

export default Swap;
