import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { SVG_LOAD_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY, QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, TRANSITION_TIME } from './constants';

export default function AnimateSvg(props) {
  // upon cue of an animation, isRegistered is set to true so that animation will not run repeatedly while toggle === true
  const [isLogoAnimationRunning, setIsLogoAnimationRunning] = useState(false);
  // if false, first animation will be run from logo -> quotes, then set true and all subsequent animations will follow same pattern of quotes -> logo -> quotes
  const [hasToggledBefore, setHasToggledBefore] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });
  const sizeAnim = useRef(new Animated.Value(1)).current;

  const { isShakeTriggered } = useIsShake();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: SVG_LOAD_DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  function logoAnimationOut() {
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
    ]).start(({ finished }) => {
      setIsLogoAnimationRunning(false);
      console.log("AnimateSvg, start() callback");
    });
  }

  function logoAnimationIn_Out() {
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
    ]).start(({ finished }) => {
      setIsLogoAnimationRunning(false);
      console.log("AnimateSvg start() callback");
    });
  }

  // LogoSvg fades out first time
  if (isShakeTriggered === true && hasToggledBefore === false && isLogoAnimationRunning === false) {
    console.log('AnimateSvg, 1st if block, beginning');
    setIsLogoAnimationRunning(true);
    setHasToggledBefore(true);
    logoAnimationOut();
    // LogoSvg fades in and then back out in sequence
  } else if (isShakeTriggered === true && hasToggledBefore === true && isLogoAnimationRunning === false) {
    console.log("AnimateSvg, 2nd if block");
    setIsLogoAnimationRunning(true);
    logoAnimationIn_Out();
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