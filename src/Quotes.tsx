import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { quotes } from './constants';
import { getRandomInt } from './utils';

type AnimateQuotesProps = {
  quoteIndex: number,
  setQuoteIndex: React.Dispatch<React.SetStateAction<number>>
};

export default function Quotes({
  quoteIndex,
  setQuoteIndex
}: AnimateQuotesProps) {
  useEffect(() => {
    const newQuoteIndex = getRandomInt(quotes.length);
    setQuoteIndex(newQuoteIndex);
  }, []);

  return (
    <Text style={styles.text}>{quotes[quoteIndex]}</Text>
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