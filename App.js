import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgComponent from "./LogoSvg";
import Accel from './Accelerometer';
import useIsShake from './useIsShake';
import FadeIn from './Animations';

export default function App() {
  // for use with Accelerometer.js component to pass through props (old approach)
  // const [renderSVG, setRenderSVG] = useState(false);
  // let renderSVG = useIsShake();

  return (
    <View style={styles.container}>
      {/* {renderSVG ? <SvgComponent /> : <Text style={styles.text}>False</Text>} */}
      <FadeIn style={styles.container}>
        <SvgComponent />
      </FadeIn>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black'
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
});
