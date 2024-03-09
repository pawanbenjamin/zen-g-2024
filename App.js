import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SvgComponent from "./LogoSvg";

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome!
      </Text>
      <View>
        <SvgComponent />
      </View>
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
