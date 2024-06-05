import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";
import { useIsShake } from "../useIsShake";

jest.mock("../useIsShake");
const mockUseIsShake = jest.mocked(useIsShake);

describe("App component", () => {
  it("renders App to screen", () => {
    mockUseIsShake.mockReturnValue({
      isShakeTriggered: false,
      setIsShakeReady: jest.fn(),
    });
    const { getByTestId } = render(<App />);
    expect(getByTestId("AnimateSvg")).toBeTruthy();
    expect(getByTestId("AnimateQuotes")).toBeTruthy();
  });
});
