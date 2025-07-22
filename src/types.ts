import { ReactNode } from "react";
import * as React from "react";

export interface CoreNumDisplayProps {
  value: string;
  type: "dollar" | "percentage" | "token";
  decimals?: number;
  className?: string;
  disableTooltip?: boolean;
  showPlusSign?: boolean;
}

export interface NumDisplayProps extends CoreNumDisplayProps {
  suffix?: string | ReactNode;
  prefix?: string | ReactNode;
  prefixClassName?: string;
  suffixClassName?: string;
}

export interface TooltipCompProps {
  displayValue: string | React.ReactNode;
  fullValue: string;
  className?: string;
  disableTooltip?: boolean;
}
