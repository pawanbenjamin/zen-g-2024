import { getRandomInt } from "../utils";
import { describe, expect, it } from "@jest/globals";

describe("getRandomInt", () => {
  it("generates a random integer", () => {
    expect(getRandomInt(3)).toBeLessThanOrEqual(3);
    expect(getRandomInt(3)).toBeGreaterThanOrEqual(0);
  });
});
