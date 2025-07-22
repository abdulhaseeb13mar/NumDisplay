"use client";

import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { TooltipCompProps } from "../types";

const TooltipComp: React.FC<TooltipCompProps> = ({
  displayValue,
  fullValue,
  className,
  disableTooltip = false,
}) => {
  if (disableTooltip) {
    return <span className={className}>{displayValue}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`cursor-pointer ${className}`}>{displayValue}</span>
      </TooltipTrigger>
      <TooltipContent>{fullValue}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipComp;
