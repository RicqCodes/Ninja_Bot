import React from "react";

import { PiCheckCircleFill } from "react-icons/pi";
import { RiLoader2Line } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { UseRunDetailsResult } from "@trigger.dev/react";

interface StatusIndicatorProps {
  runDetails: UseRunDetailsResult;
  index: number;
  text: string;
  startingStatus: string;
  endingStatus: string;
}
const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  runDetails,
  text,
  index,
  startingStatus,
  endingStatus,
}) => {
  return (
    <div className="flex items-center gap-2">
      {(startingStatus
        ? runDetails.data?.tasks[index]?.status === startingStatus
        : !runDetails.data) && (
        <RiLoader2Line className="animate-spin text-3xl" />
      )}
      {runDetails.data?.tasks[index].status === endingStatus && (
        <PiCheckCircleFill className="text-3xl bg-success" />
        // <div className="w-8 h-8 ml-1 rounded-full bg-success flex items-center justify-center">
        //   <GiCheckMark className="text-black font-bold" />
        // </div>
      )}
      <p className="font-sans">{text}</p>
    </div>
  );
};

export default StatusIndicator;
