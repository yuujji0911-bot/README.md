import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { grammarUnits, vocabularyData } from '../data/grammarData';
import RecallCard from '../components/RecallCard';
import RecallBlank from '../components/RecallBlank';

function buildPages() {
  const order = [];
  const byDate = {};
  const push = (date, block) => {
    if (!byDate[date]) {
      byDate[date] = [];
      order.push(date);
    }
    byDate[date].push(block);
  };

  grammarUnits.forEach((unit) => push(unit.date, { kind: 'unit', unit }));
  vocabularyData.forEach((vocab) => push(vocab.date, { kind: 'vocab', vocab }));

  return order.map((date) => ({ date, blocks: byDate[date] }));
}

// The two clearly tabular section types get real table layout instead of
// the generic stacked-field card, since that's closer to how they were
// actually drawn on the original cheat sheet.
const TABLE_TYPES = {
  comparison: {
    columns: [
      { key: 'meaning', header: '의미' },
      { key: 'preposition', header: '전치사' },
      { key: 'conjunction', header: '접속사' }
    ]
  },
  table: {
    columns: [
      { key: 'antecedent', header: '선행사' },
      { key: 'subject', header: '주격' },
      { key: 'object', header: '목적격' },
      { key: 'possessive', header: '소유격' }
    ]
  }
};

const TABLE_LABEL_COLUMNS = new Set(['meaning', 'antecedent']);

function TableBlock({ section }) {
  const { columns } = TABLE_TYPES[section.type];
  return (
    <View style={styles.table}>
      <View style={styles.tableHeaderRow}>
        {columns.map((col) => (
          <Text key={col.key} style={styles.tableHeaderCell}>
            {col.header}
          </Text>
        ))}
      </View>
      {section.cards.map((card) => (
        <View key={card.id} style={styles.tableRow}>
          {columns.map((col) => {
            const cell = card[col.key];
            return (
              <View key={col.key} style={styles.tableCell}>
                {TABLE_LABEL_COLUMNS.has(col.key) ? (
                  <Text style={styles.tableLabel}>{cell}</Text>
                ) : cell && cell !== '—' ? (
                  <RecallBlank text={cell} size="sm" />
                ) : (
                  <Text style={styles.tableDash}>—</Text>
                )}
              </View>
            );
          })}
        </View>
      ))}
      {section.notes && (
        <View style={styles.notesBox}>
          {section.notes.map((n, i) => (
            <Text key={i} style={styles.noteLine}>
              · {n}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function SectionBlock({ section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {TABLE_TYPES[section.type] ? (
        <TableBlock section={section} />
      ) : (
        section.cards.map((card) => (
          <RecallCard key={card.id} card={card} sectionType={section.type} />
        ))
      )}
    </View>
  );
}

function VocabBlock({ vocab }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{vocab.category}</Text>
      {vocab.items.map((item) => (
        <RecallCard key={item.id} card={item} sectionType="vocab" />
      ))}
    </View>
  );
}

export default function RecallPage() {
  const pages = useMemo(buildPages, []);
  const [pageIndex, setPageIndex] = useState(0);
  const page = pages[pageIndex];

  return (
    <View style={styles.container}>
      <View style={styles.pageTabs}>
        {pages.map((p, i) => (
          <TouchableOpacity
            key={p.date}
            style={[styles.pageTab, i === pageIndex && styles.pageTabActive]}
            onPress={() => setPageIndex(i)}
          >
            <Text style={[styles.pageTabText, i === pageIndex && styles.pageTabTextActive]}>
              {p.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {page.blocks.map((block) =>
          block.kind === 'unit' ? (
            <View key={block.unit.id} style={styles.unitBlock}>
              <Text style={styles.unitTitle}>{block.unit.name}</Text>
              <Text style={styles.unitMeta}>{block.unit.source}</Text>
              {block.unit.sections.map((section) => (
                <SectionBlock key={section.id} section={section} />
              ))}
            </View>
          ) : (
            <View key={block.vocab.id} style={styles.unitBlock}>
              <VocabBlock vocab={block.vocab} />
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8
  },
  pageTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#eceaf9'
  },
  pageTabActive: {
    backgroundColor: '#5856d6'
  },
  pageTabText: {
    color: '#5856d6',
    fontWeight: '600'
  },
  pageTabTextActive: {
    color: '#fff'
  },
  scroll: {
    padding: 16,
    paddingBottom: 100
  },
  unitBlock: {
    marginBottom: 20
  },
  unitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e'
  },
  unitMeta: {
    fontSize: 12,
    color: '#8e8e93',
    marginBottom: 10
  },
  section: {
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3a3a3c',
    marginBottom: 6
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
    marginBottom: 6
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#8e8e93'
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f7'
  },
  tableCell: {
    flex: 1,
    paddingRight: 4
  },
  tableLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c1c1e'
  },
  tableDash: {
    fontSize: 13,
    color: '#c7c7cc'
  },
  notesBox: {
    marginTop: 8
  },
  noteLine: {
    fontSize: 12,
    color: '#6e6e73',
    lineHeight: 18
  }
});
