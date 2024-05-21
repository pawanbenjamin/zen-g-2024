import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AnimateSvg from "./AnimateSvg";
import AnimateQuotes from "./AnimateQuotes";
import { useIsShake } from "./useIsShake";
import { registerRootComponent } from "expo";

function App() {
  const [hasInitialTransitionRun, setHasInitialTransitionRun] = useState(false);
  const { isShakeTriggered, setIsShakeReady } = useIsShake();

  return (
    <View style={styles.container}>
      <AnimateSvg
        isShakeTriggered={isShakeTriggered}
        setIsShakeReady={setIsShakeReady}
        hasInitialTransitionRun={hasInitialTransitionRun}
      />
      <AnimateQuotes
        isShakeTriggered={isShakeTriggered}
        setIsShakeReady={setIsShakeReady}
        hasInitialTransitionRun={hasInitialTransitionRun}
        setHasInitialTransitionRun={setHasInitialTransitionRun}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "black",
    position: "relative",
  },
});

export default registerRootComponent(App);
