import React from "react";
import { render, screen } from "@testing-library/react-native";
import "@testing-library/react-native/extend-expect";
import LogoSvg from "../LogoSvg";

describe("LogoSvg", () => {
  it("renders an SVG", () => {
    render(<LogoSvg />);
    const element = screen.root;
    expect(element).toHaveProp("xml");
  });
});
