import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_OUT_DURATION } from './constants';

const quotes = [
  "onus is on us.",
  "lawbreakers can't be legislated.",
  "an earthly loss is an ancestral gain.",
  "a mistake is the truth trying to come out.",
  "overturning the bullshit on a personal level by not subscribing to it is the new movement."
];

export default function Quotes(props) {
  const [quote, setQuote] = useState(0);
  const [registered, setRegistered] = useState(false);
  const { toggle } = useIsShake();

  if (toggle === true && registered === false) {
    setRegistered(true);
    const newQuote = getRandomInt(quotes.length);
    setQuote(newQuote);
  } else if (toggle === true && registered === true) {
    setTimeout(() => {
      const newQuote = getRandomInt(quotes.length);
      setQuote(newQuote);
    }, QUOTES_OUT_DURATION);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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