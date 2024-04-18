import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { SVG_LOAD_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY, QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, TRANSITION_TIME_2 } from './constants';

export default function AnimateSvg(props) {
  const [registered, setRegistered] = useState(false);
  const [toggledBefore, setToggledBefore] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });
  const sizeAnim = useRef(new Animated.Value(1)).current;

  const { toggle } = useIsShake();
  // let toggledOnce = false;
  // let hasRegistered;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: SVG_LOAD_DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  // LogoSvg fades out first time
  if (toggle === true && toggledBefore === false && registered === false) {
    console.log('AnimateSvg, 1st if block, beginning');
    setRegistered(() => {
      // hasRegistered = true;
      return true;
    });
    setToggledBefore(() => {
      // toggledOnce = true;
      return true;
    });
    // setToggledBefore(true);
    // toggledBefore = true;
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
    setTimeout(() => {
      setRegistered(() => {
        // hasRegistered = false;
        return false;
      });
      console.log("AnimateSvg, 1st if block, setTimeout");
    }, Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
    console.log("AnimateSvg, 1st if block, end");
    // LogoSvg fades in and then back out in sequence
  } else if (toggle === true && toggledBefore === true && registered === false) {
    console.log("AnimateSvg, 2nd if block");
    setRegistered(true);
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
    setTimeout(() => {
      setRegistered(false);
      console.log("AnimateSvg, 2nd if block, setTimeout");
    }, Math.max(QUOTES_OUT_DURATION, SVG_IN_DURATION) + SVG_IN_DELAY + Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  }

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
      transform: [{ rotate: spin }, { scale: sizeAnim }],
      position: 'absolute',
      left: '6%',
      height: '100%',
      width: '100%',
    }}>
      {props.children}
    </Animated.View>
  )
};