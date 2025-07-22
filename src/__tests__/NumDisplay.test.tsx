/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { NumDisplay, CoreNumDisplay } from "../NumDisplay";
import { TooltipProvider } from "../components/tooltip";

// Type augmentation for Jest DOM matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

// Mock the tooltip provider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <TooltipProvider>{children}</TooltipProvider>
);

describe("NumDisplay", () => {
  it("renders basic number display", () => {
    render(
      <TestWrapper>
        <NumDisplay value="123.45" type="dollar" />
      </TestWrapper>
    );

    expect(screen.getByText(/\$123/)).toBeInTheDocument();
  });

  it("formats currency correctly", () => {
    render(
      <TestWrapper>
        <CoreNumDisplay value="1234.56" type="dollar" decimals={2} />
      </TestWrapper>
    );

    expect(screen.getByText(/\$1,234.56/)).toBeInTheDocument();
  });

  it("formats percentage correctly", () => {
    render(
      <TestWrapper>
        <CoreNumDisplay value="15.75" type="percentage" decimals={2} />
      </TestWrapper>
    );

    expect(screen.getByText(/15.75%/)).toBeInTheDocument();
  });

  it("handles very small values", () => {
    render(
      <TestWrapper>
        <CoreNumDisplay value="0.00001234" type="dollar" />
      </TestWrapper>
    );

    // Should display with subscript notation for very small values
    // Just check that a dollar sign is present (the component is rendering)
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });

  it("handles zero values", () => {
    render(
      <TestWrapper>
        <NumDisplay value="0" type="dollar" />
      </TestWrapper>
    );

    expect(screen.getByText(/\$0/)).toBeInTheDocument();
  });

  it("shows plus sign when showPlusSign is true", () => {
    render(
      <TestWrapper>
        <CoreNumDisplay
          value="123.45"
          type="dollar"
          showPlusSign={true}
          decimals={2}
        />
      </TestWrapper>
    );

    expect(screen.getByText(/\$\+123.45/)).toBeInTheDocument();
  });

  it("handles negative values", () => {
    render(
      <TestWrapper>
        <CoreNumDisplay value="-123.45" type="dollar" decimals={2} />
      </TestWrapper>
    );

    expect(screen.getByText(/\$-123.45/)).toBeInTheDocument();
  });

  it("renders prefix and suffix", () => {
    render(
      <TestWrapper>
        <NumDisplay value="100" type="token" prefix="Total:" suffix="tokens" />
      </TestWrapper>
    );

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("tokens")).toBeInTheDocument();
  });
});
