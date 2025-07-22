import { ReactNode } from "react";

export interface CoreNumDisplayProps {
  value: string;
  type: "dollar" | "percentage" | "token";
  decimals?: number;
  className?: string;
  showPlusSign?: boolean;
}

export interface NumDisplayProps extends CoreNumDisplayProps {
  suffix?: string | ReactNode;
  prefix?: string | ReactNode;
  prefixClassName?: string;
  suffixClassName?: string;
}
