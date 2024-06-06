import { renderHook } from "@testing-library/react-native";
import { useIsShake } from "../useIsShake";

describe("useIsShake hook", () => {
  it("checks if isShakeTriggered === false on initialization", () => {
    const { result } = renderHook(() => useIsShake());
    expect(result.current.isShakeTriggered).toBe(false);
  });
});
