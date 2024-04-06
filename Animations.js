import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
// import SvgComponent from "./LogoSvg";

// const AnimatedSvgComponent = Animated.createAnimatedComponent(SvgComponent);

export default function FadeIn(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{
      ...props.style,
      opacity: fadeAnim, // Bind opacity to animated value
    }}>
      {props.children}
    </Animated.View>
  )
};