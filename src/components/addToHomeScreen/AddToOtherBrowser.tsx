import React from "react";
import Link from "next/link";

import { FaTimes } from "react-icons/fa";

interface Props {
  closePrompt: () => void;
}

export default function AddToOtherBrowser(props: Props) {
  const { closePrompt } = props;
  const searchUrl = `https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60%] z-50 pb-12 px-4 text-white font-sans flex flex-col items-center justify-around">
      <div className="relative bg-primary p-4 h-full rounded-xl flex flex-col justify-around items-center text-center">
        <button className="absolute top-0 right-0 p-3" onClick={closePrompt}>
          <FaTimes className="text-2xl" />
        </button>
        <p className="text-md">
          For the best experience, we recommend installing the{" "}
          <span className="font-black text-md font-raleway text-tertiaryy">
            Ninja Bot app
          </span>{" "}
          to your home screen!
        </p>
        <div className="flex flex-col gap-4 items-center text-lg">
          <p>
            Unfortunately, we were unable to determine which browser you are
            using. Please search for how to install a web app for your browser.
          </p>
          <a className="text-blue-300" href={searchUrl} target="_blank">
            Try This Search
          </a>
        </div>
      </div>
    </div>
  );
}
