"use client";
import React, { useState, useEffect } from "react";
import AddToHomeScreen from "@/components/addToHomeScreen/AddToHomeScreen";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import useUserAgent from "@/hooks/useUserAgent";
import Image from "next/image";

import Logo from "@/images/main-logo.svg";
import LoginHomepage from "./loginHomepage";

export default function HomePage() {
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    "Checking your device..."
  );
  const { isMobile, userAgentString, isStandalone, userAgent } = useUserAgent();

  useEffect(() => {
    const welcomeMessage = isMobile
      ? "You are on a mobile device."
      : "You are on a desktop device. Please use a mobile device to view this app.";
    setWelcomeMessage(welcomeMessage);
  }, [isMobile]);

  return isStandalone === null ? (
    <motion.div
      className="w-full flex items-center justify-center fixed top-0 left-0 h-full"
      initial={{ opacity: 0.8, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        delay: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5,
      }}
    >
      <Image src={Logo} alt="Ninja bot logo" />
    </motion.div>
  ) : isStandalone ? (
    <LoginHomepage />
  ) : (
    <main className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center">
        <Image src={Logo} alt="ninja bot logo" />
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 mt-[-4rem]">
          <div className="w-full h-full flex flex-col gap-2">
            <motion.p
              className="text-center font-mono text-sm text-accent_fff"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.5 }}
            >
              {welcomeMessage}
            </motion.p>
            {userAgentString && (
              <p className="text-center text-xs text-gray-400 font-mono">
                {userAgentString}
              </p>
            )}
            <AddToHomeScreen />
          </div>
        </div>
      </div>
    </main>
  );
}
