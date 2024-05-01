import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { SVG_LOAD_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY, QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, TRANSITION_TIME_2 } from './constants';

export default function AnimateSvg(props) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasToggledBefore, setHasToggledBefore] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });
  const sizeAnim = useRef(new Animated.Value(1)).current;

  const { toggle } = useIsShake();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: SVG_LOAD_DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  // LogoSvg fades out first time
  if (toggle && !hasToggledBefore && !isRegistered) {
    setIsRegistered(true);
    setHasToggledBefore(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: SVG_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: SVG_OUT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: SVG_OUT_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
    const endOfAnim = setTimeout(() => {
      setIsRegistered(false);
      clearTimeout(endOfAnim);
    }, Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
    // LogoSvg fades in and then back out in sequence
  } else if (toggle && hasToggledBefore && !isRegistered) {
    setIsRegistered(true);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: SVG_IN_DURATION,
          delay: SVG_IN_DELAY,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: SVG_IN_DURATION,
          delay: SVG_IN_DELAY,
          useNativeDriver: true,
        }),
        Animated.timing(sizeAnim, {
          toValue: 1,
          duration: SVG_IN_DURATION,
          delay: SVG_IN_DELAY,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: SVG_OUT_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 1,
          duration: SVG_OUT_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(sizeAnim, {
          toValue: 0.5,
          duration: SVG_OUT_DURATION,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    const endOfAnim = setTimeout(() => {
      setIsRegistered(false);
      clearTimeout(endOfAnim);
    }, Math.max(QUOTES_OUT_DURATION, SVG_IN_DURATION) + SVG_IN_DELAY + Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  }

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
      transform: [{ rotate: spin }, { scale: sizeAnim }], // Bind transform to animated values
      position: 'absolute',
      left: '6%',
      height: '100%',
      width: '100%',
    }}>
      {props.children}
    </Animated.View>
  )
};