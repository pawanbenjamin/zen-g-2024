import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY, quotes } from './constants';
import { getRandomInt } from './utils';

export default function Quotes(props) {
  const [quote, setQuote] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const { isShakeTriggered } = useIsShake();

  if (isShakeTriggered === true && hasToggledBefore === false && isRegistered === false) {
    console.log("Quotes, 1st if block");
    setIsRegistered(true);
    setHasToggledBefore(true);
    const newQuote = getRandomInt(quotes.length);
    setQuote(newQuote);
    const endOfAnim = setTimeout(() => {
      setIsRegistered(false);
      console.log("Quotes, 1st if block, setTimeout");
      clearTimeout(endOfAnim);
    }, Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  } else if (isShakeTriggered === true && hasToggledBefore === true && isRegistered === false) {
    console.log("Quotes, 2nd if block");
    setIsRegistered(true);
    const changeQuote = setTimeout(() => {
      const newQuote = getRandomInt(quotes.length);
      setQuote(newQuote);
      clearTimeout(changeQuote);
    }, QUOTES_OUT_DURATION);
    const endOfAnim = setTimeout(() => {
      setIsRegistered(false);
      console.log("Quotes, 2nd if block, 2nd setTimout, setIsRegistered()");
      clearTimeout(endOfAnim);
    }, Math.max(QUOTES_OUT_DURATION, SVG_IN_DURATION) + SVG_IN_DELAY + Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  }


  return (
    <Text style={styles.text}>{quotes[quote]}</Text>
  )
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
})