import React from "react";

import { FaInfoCircle } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { UseRunDetailsResult } from "@trigger.dev/react";

interface StatusIndicatorProps {
  runDetails: UseRunDetailsResult;
  startingStatus: string;
  endingStatus: string;
  text: string;
  isLoading?: boolean;
}
const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  runDetails,
  isLoading,
  text,
  startingStatus,
  endingStatus,
}) => {
  return (
    <div className="flex items-center gap-2">
      {isLoading ||
        (runDetails.data?.status === startingStatus && (
          <RiLoader2Line className="animate-spin text-3xl" />
        ))}
      {runDetails.data?.status === endingStatus && (
        <div className="w-8 h-8 ml-1 rounded-full bg-success flex items-center justify-center">
          <GiCheckMark className="text-black font-bold" />
        </div>
      )}
      <p className="font-sans">{text}</p>
    </div>
  );
};

export default StatusIndicator;
