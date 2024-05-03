import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, quotes } from './constants';
import { getRandomInt } from './utils';
import Quotes from "./Quotes";

export default function AnimateQuotes(props) {
  const [isQuoteAnimationRunning, setIsQuoteAnimationRunning] = useState(false);
  const [quote, setQuote] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0.5)).current;

  const { isShakeTriggered } = props.isShakeTriggered;
  const { setIsShakeReady } = props.setIsShakeReady;
  const { hasToggledBefore } = props.hasToggledBefore;
  const { setHasToggledBefore } = props.setHasToggledBefore;

  function quoteAnimationIn() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      setIsQuoteAnimationRunning(false);
      setIsShakeReady(true);
      setHasToggledBefore(true);
    });
  };

  function quoteAnimationOut_CallbackIn() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: QUOTES_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: QUOTES_OUT_DURATION,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      const newQuote = getRandomInt(quotes.length);
      setQuote(newQuote);
      quoteAnimationBackIn();
    });
  };

  function quoteAnimationBackIn() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: QUOTES_IN_DURATION,
        delay: QUOTES_IN_DELAY,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      setIsQuoteAnimationRunning(false);
      setIsShakeReady(true);
    });
  };

  // lands on Quotes after LogoSvg fades out first time
  if (isShakeTriggered && !hasToggledBefore && !isQuoteAnimationRunning) {
    setIsQuoteAnimationRunning(true);
    quoteAnimationIn();
    // Quotes fade out, delay for LogoSvg fade in/fade, then Quotes fade back in
  } else if (isShakeTriggered && hasToggledBefore && !isQuoteAnimationRunning) {
    setIsQuoteAnimationRunning(true);
    quoteAnimationOut_CallbackIn();
  }

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
      transform: [{ scale: sizeAnim }], // Bind transform to animated value
      position: 'absolute',
      left: '6%',
      top: '45%',
      height: '100%',
      width: '100%',
    }}>
      <Quotes quote={{ quote }} setQuote={{ setQuote }} />
    </Animated.View>
  )
};