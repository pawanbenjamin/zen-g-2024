import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsShake } from './useIsShake';
import { QUOTES_IN_DURATION, QUOTES_IN_DELAY, QUOTES_OUT_DURATION, SVG_OUT_DURATION, SVG_IN_DURATION, SVG_IN_DELAY } from './constants';

const quotes = [
  "onus is on us.",
  "lawbreakers can't be legislated.",
  "an earthly loss is an ancestral gain.",
  "a mistake is the truth trying to come out.",
  "overturning the bullshit on a personal level by not subscribing to it is the new movement.",
  "there are mistakes that are derived from a lack of discipline and those that are born of brilliance.",
  "don't go in and out of meditative spaces - stay there with that awareness, always.",
  "everything in life is meditative.",
  "tis better to hit an air ball, than to force a note that don't wanna come out.",
  "the blues ain't a form. it's a feel.",
  "art serves as a bridge between this world and the ancestral one.",
  "art promotes creative and critical thinking, both of which are threats to the status-quo.",
  "it's illogical to expect your abuser to aid in your recovery.",
  "colonialism has people convinced that we must take from someone else to get ahead.",
  "indigenous people understand that to serve the community helps everyone.",
  "if we care about the place in which we live, we must value the artists who help make it beautiful.",
  "we are here to assist in each other's evolution.",
  "art is not here to make you feel good. it's here to make you grow, which is good for you.",
  "take care of the music and the music will take care of you.",
  "protect the people you love. call out bullshit at all costs. appreciate free thought in all its glory.",
  "we only want to believe the 'good' things about the people we admire, when what makes them heroes is how they negotiate their flaws.",
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
    const endOfAnim = setTimeout(() => {
      setRegistered(false);
      setToggledBefore(true);
      console.log("Quotes, 1st if block, setTimeout");
      clearTimeout(endOfAnim);
    }, Math.max(SVG_OUT_DURATION, QUOTES_IN_DURATION) + QUOTES_IN_DELAY);
  } else if (toggle === true && toggledBefore === true && registered === false) {
    console.log("Quotes, 2nd if block");
    setRegistered(true);
    const changeQuote = setTimeout(() => {
      const newQuote = getRandomInt(quotes.length);
      setQuote(newQuote);
      console.log("Quotes, 2nd if Block, 1st setTimeout, setQuote()");
      clearTimeout(changeQuote);
    }, QUOTES_OUT_DURATION);
    const endOfAnim = setTimeout(() => {
      setRegistered(false);
      console.log("Quotes, 2nd if block, 2nd setTimout, setRegistered()");
      clearTimeout(endOfAnim);
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