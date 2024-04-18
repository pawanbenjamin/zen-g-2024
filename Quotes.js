import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY } from './constants';

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
  const [toggledBefore, setToggledBefore] = useState(false);
  const { toggle } = useIsShake();

  if (toggle === true && toggledBefore === false && registered === false) {
    console.log("Quotes, 1st if block");
    setRegistered(true);
    const newQuote = getRandomInt(quotes.length);
    setQuote(newQuote);
    setTimeout(() => {
      setRegistered(false);
      setToggledBefore(true);
      console.log("Quotes, 1st if block, setTimeout");
    }, Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  } else if (toggle === true && toggledBefore === true && registered === false) {
    console.log("Quotes, 2nd if block");
    setRegistered(true);
    setTimeout(() => {
      const newQuote = getRandomInt(quotes.length);
      setQuote(newQuote);
      console.log("Quotes, 2nd if Block, 1st setTimeout, setQuote()");
    }, QUOTES_OUT_DURATION);
    setTimeout(() => {
      setRegistered(false);
      console.log("Quotes, 2nd if block, 2nd setTimout, setRegistered()");
    }, Math.max(QUOTES_OUT_DURATION, SVG_IN_DURATION) + SVG_IN_DELAY + Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
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