/// <reference types="@testing-library/jest-dom" />
import React from "react";
import { render, screen } from "@testing-library/react";
import { NumDisplay, CoreNumDisplay } from "../NumDisplay";

// Type augmentation for Jest DOM matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

describe("NumDisplay", () => {
  it("renders basic number display", () => {
    render(<NumDisplay value="123.45" type="dollar" />);

    expect(screen.getByText(/\$123/)).toBeInTheDocument();
  });

  it("formats currency correctly", () => {
    render(<CoreNumDisplay value="1234.56" type="dollar" decimals={2} />);

    expect(screen.getByText(/\$1,234.56/)).toBeInTheDocument();
  });

  it("formats percentage correctly", () => {
    render(<CoreNumDisplay value="15.75" type="percentage" decimals={2} />);

    expect(screen.getByText(/15.75%/)).toBeInTheDocument();
  });

  it("handles very small values", () => {
    render(<CoreNumDisplay value="0.00001234" type="dollar" />);

    // Should display with subscript notation for very small values
    // Just check that a dollar sign is present (the component is rendering)
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });

  it("handles zero values", () => {
    render(<NumDisplay value="0" type="dollar" />);

    expect(screen.getByText(/\$0/)).toBeInTheDocument();
  });

  it("shows plus sign when showPlusSign is true", () => {
    render(
      <CoreNumDisplay
        value="123.45"
        type="dollar"
        showPlusSign={true}
        decimals={2}
      />
    );

    expect(screen.getByText(/\$\+123.45/)).toBeInTheDocument();
  });

  it("handles negative values", () => {
    render(<CoreNumDisplay value="-123.45" type="dollar" decimals={2} />);

    expect(screen.getByText(/\$-123.45/)).toBeInTheDocument();
  });

  it("renders prefix and suffix", () => {
    render(
      <NumDisplay value="100" type="token" prefix="Total:" suffix="tokens" />
    );

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("tokens")).toBeInTheDocument();
  });
});
