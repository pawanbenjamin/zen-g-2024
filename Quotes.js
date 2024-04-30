import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY, quotes } from './constants';
import { getRandomInt } from './utils';

export default function Quotes(props) {
  const [quote, setQuote] = useState(0);
  const [registered, setRegistered] = useState(false);
  const [toggledBefore, setToggledBefore] = useState(false);
  const { toggle } = useIsShake();

  if (toggle && !toggledBefore && !registered) {
    setRegistered(true);
    const newQuote = getRandomInt(quotes.length);
    setQuote(newQuote);
    const endOfAnim = setTimeout(() => {
      setRegistered(false);
      setToggledBefore(true);
      clearTimeout(endOfAnim);
    }, Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  } else if (toggle && toggledBefore && !registered) {
    setRegistered(true);
    const changeQuote = setTimeout(() => {
      const newQuote = getRandomInt(quotes.length);
      setQuote(newQuote);
      clearTimeout(changeQuote);
    }, QUOTES_OUT_DURATION);
    const endOfAnim = setTimeout(() => {
      setRegistered(false);
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