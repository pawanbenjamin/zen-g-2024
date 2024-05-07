import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import AnimateSvg from './AnimateSvg';
import AnimateQuotes from './AnimateQuotes';
import { useIsShake } from './useIsShake';

export default function App() {
  const [hasInitialTransitionRun, setHasInitialTransitionRun] = useState(false);
  const { isShakeTriggered, setIsShakeReady } = useIsShake();
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <AnimateSvg isShakeTriggered={isShakeTriggered} setIsShakeReady={setIsShakeReady} hasInitialTransitionRun={hasInitialTransitionRun} width={width} />
      <AnimateQuotes isShakeTriggered={isShakeTriggered} setIsShakeReady={setIsShakeReady} hasInitialTransitionRun={hasInitialTransitionRun} setHasInitialTransitionRun={setHasInitialTransitionRun} height={height} width={width} />
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
