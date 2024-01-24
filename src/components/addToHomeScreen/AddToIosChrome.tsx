import React from "react";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { ImArrowUp } from "react-icons/im";
import { TbShare2 } from "react-icons/tb";

interface Props {
  closePrompt: () => void;
}

export default function AddToIosChrome(props: Props) {
  const { closePrompt } = props;

  return (
    <div className="fixed top-0 left-0 right-0 h-[70%] z-50 pt-12 px-4 text-white font-sans">
      <div className="relative bg-primary p-4 h-full rounded-xl flex flex-col justify-around items-center text-center">
        <ImArrowUp className="text-4xl absolute -top-[40px] right-0 text-indigo-700 z-10 animate-bounce" />
        <button className="absolute top-0 right-0 p-3" onClick={closePrompt}>
          <FaTimes className="text-2xl" />
        </button>
        <p className="text-md">
          For the best experience, we recommend installing the{" "}
          <span className="font-black text-md font-raleway text-tertiary">
            Ninja Bot app
          </span>{" "}
          to your home screen!
        </p>
        <div className="flex gap-2 items-center text-lg">
          <p>Click the</p>
          <TbShare2 className="text-4xl" />
          <p>icon</p>
        </div>
        <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
          <p>Scroll down and then click:</p>
          <div className="bg-zinc-800 flex items-center justify-center w-full px-8 py-2 rounded-lg gap-2">
            <p className="font-sans">Add to Home Screen</p>
            <AiOutlinePlusSquare className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
