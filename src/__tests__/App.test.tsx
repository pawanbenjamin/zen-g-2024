import React from "react";
import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "@jest/globals";
import App from "../App";

describe("App component", () => {
  it("renders App to screen", () => {
    render(<App />);
    expect(screen);
  });
});
