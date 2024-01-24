import React from "react";
import { HiOutlineArrowUp } from "react-icons/hi";

const RecentActivities = () => {
  return (
    <div className="flex flex-col gap-8 pt-6">
      <div className="flex flex-col gap-6">
        <p>Jan 3 2024</p>
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-accent_444 flex items-center justify-center">
                <HiOutlineArrowUp className="text-black text-xl font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Bought</p>
                <p className="text-xs">1 ETH</p>
              </div>
            </div>
            <div>4650 NJA</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-accent_444 flex items-center justify-center">
                <HiOutlineArrowUp className="text-black text-xl font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Bought</p>
                <p className="text-xs">1 ETH</p>
              </div>
            </div>
            <div>4650 NJA</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p>Jan 3 2024</p>
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-accent_444 flex items-center justify-center">
                <HiOutlineArrowUp className="text-black text-xl font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Bought</p>
                <p className="text-xs">1 ETH</p>
              </div>
            </div>
            <div>4650 NJA</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-accent_444 flex items-center justify-center">
                <HiOutlineArrowUp className="text-black text-xl font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <p>Bought</p>
                <p className="text-xs">1 ETH</p>
              </div>
            </div>
            <div>4650 NJA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
