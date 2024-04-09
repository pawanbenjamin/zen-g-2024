import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LogoSvg from "./LogoSvg";
import Quotes from "./Quotes";
import Accel from './Accelerometer';
import useIsShake from './useIsShake';
import AnimateSvg from './AnimateSvg';
import AnimateQuotes from './AnimateQuotes';

export default function App() {
  // for use with Accelerometer.js component to pass through props (old approach)
  // const [renderSVG, setRenderSVG] = useState(false);
  // let renderSVG = useIsShake();

  return (
    <View style={styles.window}>
      {/* {renderSVG ? <SvgComponent /> : <Text style={styles.text}>False</Text>} */}

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
  container: {
    position: 'absolute',
    // top: '50%',
    // bottom: '50%',
    left: '6%',
    // right: '50%',
    height: '100%',
    width: '100%',
    // zIndex: 2,
    // backgroundColor: 'black',
  },
  text: {
    textAlign: 'center',
    color: 'white'
  },
});
