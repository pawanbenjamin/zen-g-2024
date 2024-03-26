import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgComponent from "./LogoSvg";
import Accel from './Accelerometer';
import useIsShake from './useIsShake';

export default function App() {
  // for use with Accelerometer.js component to pass through props (old approach)
  // const [renderSVG, setRenderSVG] = useState(false);
  let renderSVG = useIsShake();

  return (
    <View style={styles.container}>
      <SvgComponent />
      {/* following line used to pass props down to Accel component (old approach) */}
      {/* {renderSVG ? <SvgComponent /> : <Accel renderSVG={renderSVG} setRenderSVG={setRenderSVG} />} */}
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
    color: 'black'
  }
});
