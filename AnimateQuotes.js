import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import useIsShake from './useIsShake';

export default function AnimateQuotes(props) {
  const [registered, setRegistered] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeAnim = useRef(new Animated.Value(0.5)).current;
  // const size = sizeAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['50%', '100%'],
  // });

  let shake = useIsShake();

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // })

  if (shake === true && registered === 0) {
    setRegistered(1);
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 5000,
    //   useNativeDriver: true,
    // }).start();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        delay: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: 5000,
        delay: 1500,
        useNativeDriver: true,
      })
    ]).start();
  } else if (shake === false && registered === 1) {
    setRegistered(0);
    // Animated.timing(fadeAnim, {
    //   toValue: 0,
    //   duration: 5000,
    //   useNativeDriver: true,
    // }).start();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: 5000,
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
      // bottom: '100%',
      height: '100%',
      width: '100%',
    }}>
      {props.children}
    </Animated.View>
  )
};