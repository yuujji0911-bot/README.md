import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RecallBlank({ text, size = 'md' }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setRevealed((r) => !r)}
      style={[styles.chip, size === 'sm' && styles.chipSm, revealed && styles.chipRevealed]}
      activeOpacity={0.6}
    >
      <Text
        style={[
          styles.text,
          size === 'sm' && styles.textSm,
          revealed ? styles.textRevealed : styles.textHidden
        ]}
      >
        {revealed ? text : '•  •  •'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#eceaf9',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6
  },
  chipSm: {
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  chipRevealed: {
    backgroundColor: '#e3f7ea'
  },
  text: {
    fontSize: 14,
    fontWeight: '600'
  },
  textSm: {
    fontSize: 12
  },
  textHidden: {
    color: '#9a94d6',
    letterSpacing: 1
  },
  textRevealed: {
    color: '#1c7c3f'
  }
});
