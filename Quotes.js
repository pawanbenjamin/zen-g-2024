import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { quotes } from './constants';
import { getRandomInt } from './utils';

export default function Quotes(props) {
  const { quote, setQuote } = props.quote;

  useEffect(() => {
    const newQuote = getRandomInt(quotes.length);
    setQuote(newQuote);
  }, []);

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