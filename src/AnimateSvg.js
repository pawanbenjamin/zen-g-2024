import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { SVG_LOAD_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY } from './constants';
import LogoSvg from './LogoSvg';

export default function AnimateSvg({ isShakeTriggered, setIsShakeReady, hasInitialTransitionRun }) {
  const [isLogoAnimationRunning, setIsLogoAnimationRunning] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });
  const sizeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: SVG_LOAD_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setIsShakeReady(true);
    });
  }, []);

  function logoAnimationOutInitialization() {
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
    ]).start(() => {
      setIsLogoAnimationRunning(false);
    });
  };

  function logoAnimationIn_CallbackOut() {
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
    ]).start(() => {
      logoAnimationBackOut();
      setIsLogoAnimationRunning(false);
    });
  };

  function logoAnimationBackOut() {
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
  };

  // LogoSvg fades out first time
  if (isShakeTriggered && !hasInitialTransitionRun && !isLogoAnimationRunning) {
    setIsLogoAnimationRunning(true);
    logoAnimationOutInitialization();
    // LogoSvg fades in and then back out in sequence
  } else if (isShakeTriggered && hasInitialTransitionRun && !isLogoAnimationRunning) {
    setIsLogoAnimationRunning(true);
    logoAnimationIn_CallbackOut();
  }

  return (
    <Animated.View style={{
      opacity: fadeAnim, // Bind opacity to animated value
      transform: [{ rotate: spin }, { scale: sizeAnim }], // Bind transform to animated values
      position: 'absolute',
      height: '100%',
      width: '100%',
    }}>
      <LogoSvg />
    </Animated.View>
  )
};