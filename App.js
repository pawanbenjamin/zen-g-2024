import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogoSvg from "./LogoSvg";
import Quotes from "./Quotes";
import AnimateSvg from './AnimateSvg';
import AnimateQuotes from './AnimateQuotes';

export default function App() {
  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
    position: 'relative',
  },
});
