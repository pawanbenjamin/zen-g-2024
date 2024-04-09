import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import useIsShake from './useIsShake';

export default function AnimateQuotes(props) {
  const [registered, setRegistered] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0.5)).current;

  let shake = useIsShake();

  // lands on LogoSvg between quotes
  if (shake === true && registered === 0) {
    setRegistered(1);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: 2500,
        delay: 1000,
        useNativeDriver: true,
      })
    ]).start();
  } else if (shake === false && registered === 1) {
    setRegistered(0);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: 3000,
        useNativeDriver: true,
      })
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