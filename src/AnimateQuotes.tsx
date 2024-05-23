import React, { useRef, useState } from "react";
import { Animated } from "react-native";
import {
  QUOTES_IN_DURATION,
  QUOTES_IN_DELAY,
  QUOTES_OUT_DURATION,
  quotes,
} from "./constants";
import { getRandomInt } from "./utils";
import Quotes from "./Quotes";

type AppPropsAnimateQuotes = {
  isShakeTriggered: boolean;
  setIsShakeReady: React.Dispatch<React.SetStateAction<boolean>>;
  hasInitialTransitionRun: boolean;
  setHasInitialTransitionRun: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AnimateQuotes({
  isShakeTriggered,
  setIsShakeReady,
  hasInitialTransitionRun,
  setHasInitialTransitionRun,
}: AppPropsAnimateQuotes) {
  const [isQuoteAnimationRunning, setIsQuoteAnimationRunning] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0.5)).current;

  function quoteAnimationIn() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: false,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsQuoteAnimationRunning(false);
      setIsShakeReady(false);
      setHasInitialTransitionRun(false);
    });
  }

  function quoteAnimationOut_CallbackIn() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: QUOTES_OUT_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: QUOTES_OUT_DURATION,
        useNativeDriver: false,
      }),
    ]).start(() => {
      const newQuoteIndex = getRandomInt(quotes.length);
      setQuoteIndex(newQuoteIndex);
      quoteAnimationBackIn();
    });
  }

  function quoteAnimationBackIn() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: false,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsQuoteAnimationRunning(false);
      setIsShakeReady(false);
    });
  }

  // lands on Quotes after LogoSvg fades out first time
  if (isShakeTriggered && !hasInitialTransitionRun && !isQuoteAnimationRunning) {
    setIsQuoteAnimationRunning(false);
    quoteAnimationIn();
    // Quotes fade out, delay for LogoSvg fade in/fade, then Quotes fade back in
  } else if (isShakeTriggered && hasInitialTransitionRun && !isQuoteAnimationRunning) {
    setIsQuoteAnimationRunning(false);
    quoteAnimationOut_CallbackIn();
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
        transform: [{ scale: sizeAnim }], // Bind transform to animated value
        position: "absolute",
        // following line will hold Quotes component to center of window, eliminating the floating upward and downward motion upon fade in and out, respectively
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Quotes
        quoteIndex={quoteIndex}
        setQuoteIndex={setQuoteIndex}
      />
    </Animated.View>
  );
}
