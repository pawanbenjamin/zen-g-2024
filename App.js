import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogoSvg from "./LogoSvg";
import Quotes from "./Quotes";
// import Accel from './Accelerometer';
// import useIsShake from './useIsShake';
import AnimateSvg from './AnimateSvg';
import AnimateQuotes from './AnimateQuotes';

export default function App() {
  return (
    <View style={styles.window}>
      <AnimateSvg>
        <LogoSvg />
      </AnimateSvg>
      <AnimateQuotes>
        <Quotes />
      </AnimateQuotes>
    </View>
  )
};

const styles = StyleSheet.create({
  window: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
    position: 'relative',
  },
});
