import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import useIsShake from './useIsShake';
// import SvgComponent from "./LogoSvg";

// const AnimatedSvgComponent = Animated.createAnimatedComponent(SvgComponent);

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
  // console.log({ shake, registered });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (shake === true && registered === 0) {
    // console.log("shake true before fadeOut");
    setRegistered((oldState) => {
      // console.log("old registered:", oldState);
      return 1;
    });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(sizeAnim, {
        toValue: 0.5,
        duration: 5000,
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
        duration: 5000,
        delay: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
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
    // spinValue.setValue(0);
  }

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
      transform: [{ rotate: spin }, { scale: sizeAnim }],
      // zIndex: 2,
      position: 'absolute',
      left: '6%',
      height: '100%',
      width: '100%',
    }}>
      {props.children}
    </Animated.View>
  )
};