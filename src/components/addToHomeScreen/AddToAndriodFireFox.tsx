import React from "react";
import Image from "next/image";

import { FaTimes } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { ImArrowDownRight } from "react-icons/im";

interface Props {
  closePrompt: () => void;
}

export default function AddToAndriodFirefox(props: Props) {
  const { closePrompt } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60%] z-50 pb-12 px-4 text-white font-sans">
      <div className="relative bg-primary p-4 h-full rounded-xl flex flex-col justify-around items-center text-center">
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
          <HiDotsVertical className="text-4xl" />
          <p>icon</p>
        </div>
        <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
          <p>Scroll down and then click:</p>
          <div className="bg-zinc-50 flex items-center justify-center w-full px-4 py-2 rounded-lg text-zinc-900 gap-2">
            <div className="flex gap-6 items-center">
              {/* <Image
                src={ffIcon}
                alt="Firefox install icon"
                width={32}
                height={32}
              /> */}
              <p>Install</p>
            </div>
          </div>
        </div>
        <ImArrowDownRight className="text-4xl absolute -bottom-[50px] right-1 text-indigo-700 z-10 animate-bounce" />
      </div>
    </div>
  );
}
