import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import "@testing-library/react-native/extend-expect";
import AnimateSvg from "../AnimateSvg";
import { SVG_LOAD_DURATION } from "../constants";

describe("AnimateSvg", () => {
  const mockProps = {
    isShakeTriggered: false,
    setIsShakeReady: jest.fn(),
    hasInitialTransitionRun: false,
  };

  it("renders AnimateSvg and child components", () => {
    const { getByTestId } = render(<AnimateSvg {...mockProps} />);
    expect(getByTestId("LogoSvg")).toBeTruthy();
  });

  it("checks that AnimateSvg is initialized with opacity: 0 and useEffect() raises opacity value to 1", async () => {
    const { getByTestId } = render(<AnimateSvg {...mockProps} />);
    expect(getByTestId("AnimateSvg")).toHaveStyle({ opacity: 0 });
    await waitFor(
      () => {
        expect(getByTestId("AnimateSvg")).toHaveStyle({ opacity: 1 });
      },
      { timeout: SVG_LOAD_DURATION + 50 }
    );
  });

  it("checks if AnimateSvg useEffect() calls setIsShakeReady function", async () => {
    render(<AnimateSvg {...mockProps} />);
    await waitFor(
      () => {
        expect(mockProps.setIsShakeReady).toHaveBeenCalled();
      },
      { timeout: SVG_LOAD_DURATION + 50 }
    );
  });
});
