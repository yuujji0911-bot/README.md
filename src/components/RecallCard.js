import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RecallBlank from './RecallBlank';

// Fields that hold the English term/expression you're meant to recall.
const BLANK_KEYS = new Set([
  'preposition', 'conjunction', 'expression', 'expressions', 'items', 'verbs',
  'adjectives', 'nouns', 'content', 'subject', 'object', 'possessive',
  'pattern', 'clausePattern', 'patterns', 'term', 'noun', 'adjective',
  'connector', 'wrong', 'correct'
]);

// Fields that are always-visible context (Korean gloss, rules, examples).
const LABEL_KEYS = new Set([
  'meaning', 'category', 'usage', 'note', 'notes', 'title', 'antecedent',
  'warning', 'tip', 'rules', 'source', 'description', 'letter', 'reason',
  'example', 'examples', 'rule'
]);

const HIDDEN_KEYS = new Set(['id', 'difficulty']);

// Cards from a couple of section types carry an internal classification
// field that isn't meant for display (e.g. every 'comparison' card repeats
// category: 'preposition').
const TYPE_EXCLUDED_KEYS = {
  comparison: ['category']
};

const hasKorean = (str) => /[ㄱ-힝]/.test(str);

function FieldValue({ fieldKey, value }) {
  if (value == null) return null;

  if (typeof value === 'string') {
    if (BLANK_KEYS.has(fieldKey)) return <RecallBlank text={value} />;
    if (LABEL_KEYS.has(fieldKey)) return <Text style={styles.labelText}>{value}</Text>;
    return hasKorean(value) ? (
      <Text style={styles.labelText}>{value}</Text>
    ) : (
      <RecallBlank text={value} />
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;

    if (typeof value[0] === 'string') {
      const isBlank = BLANK_KEYS.has(fieldKey) || (!LABEL_KEYS.has(fieldKey) && !hasKorean(value[0]));
      if (isBlank) {
        return (
          <View>
            <CountLabel count={value.length} />
            <View style={styles.wrapRow}>
              {value.map((v, i) => (
                <RecallBlank key={i} text={v} size="sm" />
              ))}
            </View>
          </View>
        );
      }
      return (
        <View>
          {value.map((v, i) => (
            <Text key={i} style={styles.bullet}>
              · {v}
            </Text>
          ))}
        </View>
      );
    }

    // array of objects (e.g. expressions: [{term, meaning}])
    return (
      <View>
        <CountLabel count={value.length} />
        {value.map((item, i) => (
          <View key={i} style={styles.objectRow}>
            <ObjectFields obj={item} />
          </View>
        ))}
      </View>
    );
  }

  if (typeof value === 'object') {
    return <ObjectFields obj={value} />;
  }

  return <Text style={styles.labelText}>{String(value)}</Text>;
}

function CountLabel({ count }) {
  if (count <= 1) return null;
  return <Text style={styles.countLabel}>총 {count}개</Text>;
}

function ObjectFields({ obj }) {
  const entries = Object.entries(obj).filter(([k]) => !HIDDEN_KEYS.has(k));
  return (
    <View style={styles.inlineWrap}>
      {entries.map(([k, v]) => (
        <View key={k} style={styles.inlineField}>
          <FieldValue fieldKey={k} value={v} />
        </View>
      ))}
    </View>
  );
}

export default function RecallCard({ card, sectionType }) {
  const excluded = new Set([...HIDDEN_KEYS, ...(TYPE_EXCLUDED_KEYS[sectionType] || [])]);
  const entries = Object.entries(card).filter(([k]) => !excluded.has(k));

  return (
    <View style={styles.card}>
      {entries.map(([k, v]) => (
        <View key={k} style={styles.row}>
          <FieldValue fieldKey={k} value={v} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },
  row: {
    marginBottom: 6
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  countLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9a94d6',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3
  },
  labelText: {
    fontSize: 14,
    color: '#3a3a3c',
    lineHeight: 20
  },
  bullet: {
    fontSize: 13,
    color: '#3a3a3c',
    lineHeight: 20
  },
  objectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4
  },
  inlineWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  inlineField: {
    marginRight: 8,
    marginBottom: 4
  }
});
