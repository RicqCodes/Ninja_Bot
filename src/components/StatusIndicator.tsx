import React from "react";

import { PiCheckCircleFill } from "react-icons/pi";
import { RiLoader2Line } from "react-icons/ri";
import { MdError } from "react-icons/md";
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
      {(runDetails.data?.tasks[index]?.status === endingStatus ||
        runDetails.data?.tasks[index]?.status === "COMPLETED") && (
        <PiCheckCircleFill className="text-3xl text-success" />
      )}
      {runDetails.data?.tasks[index]?.status === "ERRORED" && (
        <MdError className="text-3xl text-error" />
      )}
      <p className="font-sans">{text}</p>
    </div>
  );
};

export default StatusIndicator;
