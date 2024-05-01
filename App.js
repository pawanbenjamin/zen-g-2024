import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimateSvg from './AnimateSvg';
import AnimateQuotes from './AnimateQuotes';
import { useIsShake } from './useIsShake';

export default function App() {
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const { isShakeTriggered, setIsToggleReady } = useIsShake();

  return (
    <View style={styles.window}>
      <AnimateSvg useIsShake={{ isShakeTriggered, setIsToggleReady }} toggledBefore={{ hasToggledBefore }} />
      <AnimateQuotes useIsShake={{ isShakeTriggered, setIsToggleReady }} toggledBefore={{ hasToggledBefore, setHasToggledBefore }} />
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
