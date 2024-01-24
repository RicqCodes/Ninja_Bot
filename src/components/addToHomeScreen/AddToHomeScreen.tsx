"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ModuleLoading = () => (
  <p className="animate-bounce text-white font-bold">Loading...</p>
);
const AddToIosSafari = dynamic(() => import("./AddToIosSafari"), {
  loading: () => <ModuleLoading />,
});
const AddToAndriodChrome = dynamic(() => import("./AddToAndriodChrome"), {
  loading: () => <ModuleLoading />,
});
const AddToAndriodFirefox = dynamic(() => import("./AddToAndriodFireFox"), {
  loading: () => <ModuleLoading />,
});
const AddToIosFirefox = dynamic(() => import("./AddToIosFirefox"), {
  loading: () => <ModuleLoading />,
});
const AddToIosChrome = dynamic(() => import("./AddToIosChrome"), {
  loading: () => <ModuleLoading />,
});
const AddToSamsung = dynamic(() => import("./AddToSamsung"), {
  loading: () => <ModuleLoading />,
});
const AddToOtherBrowser = dynamic(() => import("./AddToOtherBrowser"), {
  loading: () => <ModuleLoading />,
});

import useUserAgent from "@/hooks/useUserAgent";

type AddToHomeScreenPromptType =
  | "safari"
  | "chrome"
  | "firefox"
  | "other"
  | "firefoxIos"
  | "chromeIos"
  | "samsung"
  | "";
const COOKIE_NAME = "addToHomeScreenPrompt";

export default function AddToHomeScreen() {
  const [displayPrompt, setDisplayPrompt] =
    useState<AddToHomeScreenPromptType>("");
  const { userAgent, isMobile, isStandalone, isIOS } = useUserAgent();

  const closePrompt = () => {
    setDisplayPrompt("");
  };

  useEffect(() => {
    // Only show prompt if user is on mobile and app is not installed
    if (isMobile && !isStandalone) {
      if (userAgent === "Safari") {
        setDisplayPrompt("safari");
      } else if (userAgent === "Chrome") {
        setDisplayPrompt("chrome");
      } else if (userAgent === "Firefox") {
        setDisplayPrompt("firefox");
      } else if (userAgent === "FirefoxiOS") {
        setDisplayPrompt("firefoxIos");
      } else if (userAgent === "ChromeiOS") {
        setDisplayPrompt("chromeIos");
      } else if (userAgent === "SamsungBrowser") {
        setDisplayPrompt("samsung");
      } else {
        setDisplayPrompt("other");
      }
    } else {
    }
  }, [userAgent, isMobile, isStandalone, isIOS]);

  const Prompt = () => (
    <>
      {
        {
          safari: <AddToIosSafari closePrompt={closePrompt} />,
          chrome: <AddToAndriodChrome closePrompt={closePrompt} />,
          firefox: <AddToAndriodFirefox closePrompt={closePrompt} />,
          firefoxIos: <AddToIosFirefox closePrompt={closePrompt} />,
          chromeIos: <AddToIosChrome closePrompt={closePrompt} />,
          samsung: <AddToSamsung closePrompt={closePrompt} />,
          other: <AddToOtherBrowser closePrompt={closePrompt} />,
          "": <></>,
        }[displayPrompt]
      }
    </>
  );

  return (
    <>
      {displayPrompt !== "" ? (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50"
            onClick={closePrompt}
          >
            <Prompt />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
