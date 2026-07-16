import { grammarUnits, vocabularyData } from './grammarData';

// One forgetting-curve record per studied block (a grammar unit or a
// vocab group), not per individual card — that's the granularity the
// recall page actually reviews at.
export function getReviewItems() {
  const fromUnits = grammarUnits.map((u) => ({ id: u.id, label: u.name, date: u.date }));
  const fromVocab = vocabularyData.map((v) => ({ id: v.id, label: v.category, date: v.date }));
  return [...fromUnits, ...fromVocab];
}
