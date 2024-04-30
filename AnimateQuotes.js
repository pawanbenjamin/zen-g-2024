import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_IN_DELAY, SVG_IN_DURATION, SVG_OUT_DURATION, TRANSITION_TIME } from './constants';

export default function AnimateQuotes(props) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasToggledBefore, setHasToggledBefore] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0.5)).current;

  const { isShakeTriggered } = useIsShake();

  // lands on Quotes after LogoSvg fades out first time
  if (isShakeTriggered === true && hasToggledBefore === false && isRegistered === false) {
    console.log("AnimateQuotes, 1st if block");
    setIsRegistered(true);
    setHasToggledBefore(true);
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
      setIsRegistered(false);
      console.log("AnimateQuotes start() callback");
    });
    // Quotes fade out, delay for LogoSvg fade in/fade, then Quotes fade back in
  } else if (isShakeTriggered === true && hasToggledBefore === true && isRegistered === false) {
    console.log("AnimateQuotes, 2nd if block");
    setIsRegistered(true);
    Animated.sequence([
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
      ]),
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
      ]),
    ]).start(({ finished }) => {
      setIsRegistered(false);
      console.log("AnimateQuotes start() callback");
    });
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
      {props.children}
    </Animated.View>
  )
};