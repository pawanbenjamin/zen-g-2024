import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import useIsShake from './useIsShake';
// import SvgComponent from "./LogoSvg";

// const AnimatedSvgComponent = Animated.createAnimatedComponent(SvgComponent);

export default function FadeIn(props) {
  const [registered, setRegistered] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  let shake = useIsShake();
  console.log({ shake, registered });

  useEffect(() => {
    fadeIn();
  }, []);

  if (shake === true && registered === 0) {
    console.log("shake true before fadeOut");
    setRegistered((oldState) => {
      console.log("old registered:", oldState);
      return 1;
    });
    fadeOut();
  } else if (shake === false && registered === 1) {
    setRegistered((oldState) => {
      console.log("old registered:", oldState);
      return 0;
    });
    fadeIn();
  }

  function fadeOut() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }

  function fadeIn() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
    }}>
      {props.children}
    </Animated.View>
  )
};