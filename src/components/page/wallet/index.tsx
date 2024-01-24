"use client";

import React, { Fragment, useEffect, useState } from "react";
import { PiEyeSlashDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import { LiaEthereum } from "react-icons/lia";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Avatar from "./Avatar";
import { defaultChains, supportedWallet } from "@/lib/networks";
import { fetcher } from "@/lib/fetcher";
import { useWallet } from "@/hooks/useWallet";
import { Skeleton } from "@/components/ui/skeleton";
import Modal from "@/components/modal";
import Deposit from "@/components/deposit";
import useToggle from "@/hooks/useToggle";
import { AnimatePresence } from "framer-motion";
import Withdrawal from "@/components/Withdrawal";

const Wallet = () => {
  const { wallet } = useWallet();
  const [tokenBalances, setTokenBalances] = useState<any>(null);
  const { toggle, toggleRef, toggledElementRef, handleToggle } = useToggle({
    eventType: "click",
  });
  const {
    toggle: withdrawalToggle,
    toggleRef: withdrawalToggleRef,
    toggledElementRef: withdrawalToggledElementRef,
    handleToggle: withdrawalHandleToggle,
  } = useToggle({
    eventType: "click",
  });

  const handleOffModal = () => {
    handleToggle();
  };
  const withdrawalHandleOffModal = () => {
    withdrawalHandleToggle();
    console.log("i ran");
  };

  console.log(withdrawalToggle, "withdraw toggle");

  useEffect(() => {
    const getBalances = async () => {
      const balances = await new fetcher().getNativeBalancesWithPrices(wallet!);
      setTokenBalances(balances);
      defaultChains.forEach((tokens) => {
        tokens.price = balances?.prices[tokens.chain_id];
        tokens.balance = balances?.balance[tokens.chain_id].toString();
      });
    };
    wallet && getBalances();
  }, [wallet]);

  return (
    <Fragment>
      <div className="w-full flex flex-col gap-6">
        <header className="w-full flex gap-6 items-center justify-between fixed top-0 left-0 backdrop-blur-lg bg-accent_bg px-6 pt-2 h-20 z-10">
          <div></div>
          <h1 className="text-2xl text-white font-bold">My Wallet</h1>
          <Avatar />
        </header>
        <div className="w-full flex flex-col gap-20 pb-28">
          <div className="w-full flex flex-col gap-12 fixed bg-accent_bg top-[4rem] pt-[2.4rem] pb-[1rem] left-0 px-6 z-10">
            <div className="flex flex-col gap-3">
              <div className="w-full items-center flex justify-between font-mono text-accent_fff">
                <div className="flex gap-4 items-center font-light">
                  <p className="text-lg">Total Balance</p>
                  <PiEyeSlashDuotone className="text-2xl" />
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-lg">USD</p>
                  <IoIosArrowDown className="text-lg" />
                </div>
              </div>
              <div className="flex items-center justify-between text-secondary font-mono text-accent_fff">
                <p className="text-4xl font-extrabold tracking-tighter">
                  $9,637.00
                </p>
                <p className="font-extralight tracking-tighter">+$175 (4.6%)</p>
              </div>
            </div>
            <div className="w-full flex relative justify-between gap-8">
              <Button
                variant="outline"
                className="w-[14rem] py-7 rounded-[40px] bg-accent_fff text-accent_000 text-base font-semibold"
                ref={toggleRef as React.RefObject<HTMLButtonElement>}
                onClick={handleToggle}
              >
                Deposit
              </Button>
              <div
                className="flex absolute w-[3.4rem] h-[3.4rem] rounded-full 
          bg-accent_fff left-[50%] translate-x-[-50%] z-10 p-1"
              >
                <div className="w-full bg-secondary flex items-center justify-center rounded-full">
                  <LiaEthereum className="text-2xl text-accent_fff" />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-[14rem] py-7 rounded-[40px] bg-accent_fff text-accent_000 text-base font-semibold"
                ref={withdrawalToggleRef as React.RefObject<HTMLButtonElement>}
                onClick={withdrawalHandleOffModal}
              >
                Withdraw
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-12 mt-80">
            <h2 className="text-xl font-semibold text-accent_fff">My Assets</h2>
            <div className="w-full flex flex-col gap-8">
              {defaultChains.map((chain, i) => (
                <div
                  key={chain.blockchain_name + i}
                  className="w-full flex items-center justify-center bg-accent_111 py-6 px-6 rounded-3xl"
                >
                  <div className="w-full flex gap-2">
                    <div className="w-[3.2rem] h-[3.2rem] bg-accent_fff rounded-full p-2 relative">
                      {!chain.layer_2 ? (
                        <Image
                          src={chain.logo}
                          alt="chain logo"
                          className="w-[2.4rem] h-[2.4rem]"
                        />
                      ) : (
                        chain.main_chain_logo && (
                          <Image
                            src={chain.main_chain_logo}
                            alt="chain logo"
                            className="w-[2.4rem] h-[2.4rem]"
                          />
                        )
                      )}
                      {chain.layer_2 && (
                        <Image
                          src={chain.logo}
                          alt="blockchain logo"
                          className="w-[1rem] h-[1rem] absolute right-0 bottom-1"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xl text-accent_fff font-semibold">
                        {chain.symbol}
                      </p>
                      <div className="text-accent_fff font-light text-sm opacity-75">
                        {tokenBalances === null ? (
                          <Skeleton className="h-4 w-[80px] bg-accent_555" />
                        ) : (
                          `${chain.balance} ETH`
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row gap-1 items-center">
                      <span className="text-xl text-accent_fff font-semibold opacity-75">
                        $
                      </span>
                      <div className="text-xl text-accent_fff font-semibold">
                        {tokenBalances === null ? (
                          <Skeleton className="h-4 w-[60px] bg-accent_555" />
                        ) : (
                          `${(
                            Number(chain.balance) * Number(chain.price)
                          ).toFixed(3)}`
                        )}
                      </div>
                    </div>
                    <div className="text-accent_fff font-light text-sm">
                      {tokenBalances === null ? (
                        <Skeleton className="h-4 w-[60px] bg-accent_555" />
                      ) : (
                        `$${Number(chain.price).toFixed(0)}`
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {toggle && (
          <Modal
            handleOffModal={handleOffModal}
            toggledElementRef={
              toggledElementRef as React.RefObject<HTMLDivElement>
            }
          >
            <Deposit handleOffModal={handleOffModal} />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {withdrawalToggle && (
          <Modal
            handleOffModal={withdrawalHandleOffModal}
            toggledElementRef={
              withdrawalToggledElementRef as React.RefObject<HTMLDivElement>
            }
          >
            <Withdrawal />
          </Modal>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Wallet;
