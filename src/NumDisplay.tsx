import React from "react";
import TooltipComp from "./components/TooltipComp";
import { CoreNumDisplayProps, NumDisplayProps } from "./types";
import { cn } from "./utils";

const formatValue = (
  val: string,
  decimals: number
): { value: string; subZeroCount: number } => {
  if (decimals === 0) {
    const rounded = Math.round(Number(val));
    const finalValue = rounded.toLocaleString("en-US");
    return { value: finalValue, subZeroCount: 0 };
  }

  const isNegative = val.trim().startsWith("-");
  const normalized = isNegative ? val.trim().slice(1) : val.trim();
  const parts = normalized.split(".");
  const intPart = parts[0] || "0";
  const formattedIntPart = Number(intPart).toLocaleString("en-US");
  const fracPart = parts[1] || "";
  const thresholdStr = `0.${"0".repeat(decimals - 1)}1`;
  const firstDigits = (fracPart + "0".repeat(decimals)).slice(0, decimals);
  if (
    intPart === "0" &&
    parseInt(firstDigits) === 0 &&
    normalized.replace(/[0.]/g, "") !== ""
  ) {
    const display = `<${thresholdStr}`;
    const finalValue = isNegative ? `-${display}` : display;
    return { value: finalValue, subZeroCount: 0 };
  }

  let displayFrac = fracPart;
  if (fracPart.length > decimals) {
    displayFrac = fracPart.slice(0, decimals);
  }
  const display = displayFrac
    ? `${formattedIntPart}.${displayFrac}`
    : formattedIntPart;
  const finalvalue = isNegative ? `-${display}` : display;
  return { value: finalvalue, subZeroCount: 0 };
};

const formatVerySmallValue = (
  num: number
): { value: string; subZeroCount: number } => {
  if (num === 0) return { value: "0", subZeroCount: 0 };
  let str = num.toFixed(10);
  str = str.replace(/0+$/, "").replace(/\.$/, "");

  // Handle negative numbers separately.
  const isNegative = str.startsWith("-");
  const workStr = isNegative ? str.slice(1) : str;

  // Find the index of the decimal point.
  const dotIndex = workStr.indexOf(".");
  let zerosCount = 0;
  if (dotIndex !== -1) {
    // Count zeros after the decimal point until the first nonzero digit.
    for (let i = dotIndex + 1; i < workStr.length; i++) {
      if (workStr[i] === "0") {
        zerosCount++;
      } else {
        break;
      }
    }
  }
  // If there are more than 2 zeros, subtract 1 according to the requirement.
  const subZeroCount = zerosCount > 2 ? zerosCount - 1 : 0;

  // Find index of first nonzero digit in workStr.
  let firstNonZero = -1;
  for (let i = 0; i < workStr.length; i++) {
    if (workStr[i] !== "0" && workStr[i] !== ".") {
      firstNonZero = i;
      break;
    }
  }
  if (firstNonZero === -1) return { value: "0", subZeroCount: 0 };

  // Build the result string keeping 2 significant digits after the first nonzero.
  let digitsKept = 0;
  let result = "";
  for (let i = 0; i < workStr.length; i++) {
    const ch = workStr[i];
    result += ch;
    if (ch !== ".") {
      if (i >= firstNonZero) digitsKept++;
    }
    if (digitsKept === 2) break;
  }

  // Reapply negative sign if necessary.
  if (isNegative) result = "-" + result;
  if (result.endsWith(".")) result = result.slice(0, -1);
  if (result.startsWith(".")) {
    result = "0" + result;
  } else if (result.startsWith("-.")) {
    result = "-0" + result.slice(1);
  }
  return { value: result, subZeroCount };
};

// Helper function to add prefix and suffix.
const finalDecoration = (
  valueInfo: { value: string; subZeroCount: number },
  type: CoreNumDisplayProps["type"],
  showPlusSign: boolean = false
): React.ReactNode => {
  const prefix = type === "dollar" ? "$" : "";
  const suffix = type === "percentage" ? "%" : "";

  // Add plus sign for positive values when showPlusSign is true
  const plusSign =
    showPlusSign &&
    !valueInfo.value.startsWith("-") &&
    Number(valueInfo.value) > 0
      ? "+"
      : "";

  if (
    valueInfo.subZeroCount > 0 &&
    (valueInfo.value.startsWith("0.") || valueInfo.value.startsWith("-0."))
  ) {
    // Handle both positive and negative small numbers
    const isNegative = valueInfo.value.startsWith("-");
    const startIndex = isNegative ? 3 : 2; // "-0." or "0."
    const decPart = valueInfo.value.slice(startIndex);
    // The display will always show the first digit, then a subscript for the omitted zeros,
    // then the remaining digits.
    const firstDigit = decPart.charAt(0);
    const remainder = decPart.slice(1 + valueInfo.subZeroCount);
    return (
      <>
        {prefix}
        {isNegative ? "-" : plusSign}0.{firstDigit}
        <sub>{valueInfo.subZeroCount}</sub>
        {remainder}
        {suffix}
      </>
    );
  }

  return `${prefix}${plusSign}${valueInfo.value}${suffix}`;
};

const getDisplayValue = (
  value: string,
  decimals: number,
  type: CoreNumDisplayProps["type"],
  showPlusSign: boolean = false
) => finalDecoration(formatValue(value, decimals), type, showPlusSign);

const CoreNumDisplay: React.FC<
  CoreNumDisplayProps & { tooltipValue?: string }
> = ({
  type,
  value,
  decimals,
  className,
  disableTooltip = false,
  tooltipValue = "",
  showPlusSign = false,
}) => {
  const parsed = Number(value);
  if (isNaN(parsed)) {
    return <span className={className}>{value}</span>;
  }

  const exactValue = String(value);
  let displayValue: React.ReactNode = "";

  if (decimals !== undefined) {
    displayValue = finalDecoration(
      formatValue(exactValue, decimals),
      type,
      showPlusSign
    );
  } else {
    if (type === "dollar") {
      if (parsed >= 100)
        displayValue = getDisplayValue(exactValue, 0, type, showPlusSign);
      else if (parsed >= 10)
        displayValue = getDisplayValue(exactValue, 1, type, showPlusSign);
      else if (parsed >= 1)
        displayValue = getDisplayValue(exactValue, 2, type, showPlusSign);
      else if (parsed >= 0.1)
        displayValue = getDisplayValue(exactValue, 3, type, showPlusSign);
      else if (parsed >= 0.01)
        displayValue = getDisplayValue(exactValue, 4, type, showPlusSign);
      else
        displayValue = finalDecoration(
          formatVerySmallValue(parsed),
          type,
          showPlusSign
        );
    } else if (type === "token") {
      if (parsed < 0.01) {
        displayValue = finalDecoration(
          formatVerySmallValue(parsed),
          type,
          showPlusSign
        );
      } else if (parsed < 10) {
        displayValue = getDisplayValue(exactValue, 2, type, showPlusSign);
      } else if (parsed < 100) {
        displayValue = getDisplayValue(exactValue, 1, type, showPlusSign);
      } else {
        displayValue = getDisplayValue(exactValue, 0, type, showPlusSign);
      }
    } else {
      // Percentage rules.
      if (parsed < 10)
        displayValue = getDisplayValue(exactValue, 2, type, showPlusSign);
      else if (parsed < 100)
        displayValue = getDisplayValue(exactValue, 1, type, showPlusSign);
      else displayValue = getDisplayValue(exactValue, 0, type, showPlusSign);
    }
  }

  return (
    <TooltipComp
      displayValue={displayValue}
      fullValue={tooltipValue !== "" ? tooltipValue : exactValue}
      className={className}
      disableTooltip={disableTooltip}
    />
  );
};

const NumDisplay: React.FC<NumDisplayProps & { tooltipValue?: string }> = ({
  suffix,
  prefix,
  prefixClassName,
  suffixClassName,
  value,
  disableTooltip,
  tooltipValue = "",
  ...numDisplayProps
}) => {
  const isZero = Number(value) === 0;
  return (
    <div className="flex items-center gap-1">
      {prefix && (
        <span className={cn("text-primary", prefixClassName)}>{prefix}</span>
      )}
      <CoreNumDisplay
        {...numDisplayProps}
        value={value}
        disableTooltip={isZero ? true : disableTooltip}
        // Pass tooltipValue if provided, else fallback to value
        tooltipValue={tooltipValue}
      />
      {suffix && (
        <span className={cn("text-primary", suffixClassName)}>{suffix}</span>
      )}
    </div>
  );
};

export { CoreNumDisplay, NumDisplay };
export type { CoreNumDisplayProps, NumDisplayProps };
export default NumDisplay;
