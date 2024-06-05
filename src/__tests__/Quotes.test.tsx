import React from "react";
import { render } from "@testing-library/react-native";
import Quotes from "../Quotes";
import { quotes } from "../constants";

describe("Quotes component", () => {
  it("renders Quotes with text from quotes[] containing 1 element", () => {
    const mockProps = {
      quoteIndex: 0,
      setQuoteIndex: jest.fn(),
    };
    const { getByText } = render(<Quotes {...mockProps} />);
    expect(getByText(`${quotes[mockProps.quoteIndex]}`)).toBeTruthy();
  });

  it("renders Quotes with text from quotes[] at last element", () => {
    const mockProps = {
      quoteIndex: quotes.length - 1,
      setQuoteIndex: jest.fn(),
    };
    const { getByText } = render(<Quotes {...mockProps} />);
    expect(getByText(`${quotes[mockProps.quoteIndex]}`)).toBeTruthy();
  });
});
