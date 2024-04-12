import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_IN_DURATION, SVG_OUT_DURATION } from './constants';

export default function AnimateQuotes(props) {
  const [registered, setRegistered] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0.5)).current;

  const { toggle } = useIsShake();

  // lands on Quotes after LogoSvg fades out
  if (toggle === true && registered === false) {
    setRegistered(true);
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
    ]).start();
    // Quotes fade out, delay for LogoSvg fade in/fade out duration, then Quotes fade back in
  } else if (toggle === true && registered === true) {
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
      // change delay times to include LogoSvg fade in/fade out
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
    ]).start();
  }

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
      transform: [{ scale: sizeAnim }],
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