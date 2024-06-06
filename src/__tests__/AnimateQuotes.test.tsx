import React from "react";
import { render } from "@testing-library/react-native";
import AnimateQuotes from "../AnimateQuotes";

describe("AnimateQuotes", () => {
  it("renders AnimateQuotes component", () => {
    const mockProps = {
      isShakeTriggered: false,
      setIsShakeReady: jest.fn(),
      hasInitialTransitionRun: false,
      setHasInitialTransitionRun: jest.fn(),
    };
    const { getByTestId } = render(<AnimateQuotes {...mockProps} />);
    expect(getByTestId("Quotes")).toBeTruthy();
  });
});
