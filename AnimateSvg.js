import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import useIsShake from './useIsShake';
// import SvgComponent from "./LogoSvg";

export default function AnimateSvg(props) {
  const [registered, setRegistered] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });
  const sizeAnim = useRef(new Animated.Value(1)).current;

  let shake = useIsShake();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  // lands on LogoSvg between quotes
  if (shake === true && registered === 0) {
    setRegistered((oldState) => {
      return 1;
    });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3500,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: 3500,
        useNativeDriver: true,
      })
    ]).start();
  } else if (shake === false && registered === 1) {
    setRegistered((oldState) => {
      console.log("old registered:", oldState);
      return 0;
    });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 3000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: 3000,
        delay: 500,
        useNativeDriver: true,
      })
    ]).start();
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