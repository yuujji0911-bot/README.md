import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { store } from './redux/store';
import { getReviewItems } from './data/reviewItems';
import { initializeCards, selectProgress, selectStatistics } from './redux/slices/studySlice';
import { selectAllMissingNotes, selectTotalMissing } from './redux/slices/notesSlice';
import RecallPage from './screens/RecallPage';

const reviewItems = getReviewItems();

function HomeScreen({ onNavigate }) {
  const progress = useSelector(selectProgress);
  const totalMissing = useSelector(selectTotalMissing);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>복습노트</Text>
      <Text style={styles.subtitle}>망각곡선 기반 복습 현황 (7/13 · 7/14)</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>전체 진도</Text>
        <Text style={styles.bigNumber}>{progress ? `${progress.completionRate}%` : '0%'}</Text>
        <Text style={styles.cardSub}>
          {progress ? `${progress.completed} / ${progress.total} 완료` : `0 / ${reviewItems.length} 완료`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>오늘 복습 필요</Text>
        <Text style={styles.bigNumber}>{progress ? progress.reviewDue : 0}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>오답노트</Text>
        <Text style={styles.bigNumber}>{totalMissing}</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => onNavigate('study')}>
        <Text style={styles.primaryButtonText}>학습 시작</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StudyScreen() {
  return <RecallPage />;
}

function StatisticsScreen({ onNavigate }) {
  const statistics = useSelector(selectStatistics);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>학습 통계</Text>
      {!statistics ? (
        <Text style={styles.subtitle}>아직 학습 기록이 없습니다.</Text>
      ) : (
        <>
          <StatRow label="오늘 학습" value={statistics.todayLearned} />
          <StatRow label="이번 주 학습" value={statistics.weekLearned} />
          <StatRow label="이번 달 학습" value={statistics.monthLearned} />
          <StatRow label="정답률" value={`${statistics.accuracy}%`} />
          <StatRow label="완료율" value={`${statistics.completionRate}%`} />
          <StatRow label="복습 필요" value={statistics.reviewDue} />
        </>
      )}
      <TouchableOpacity style={styles.linkButton} onPress={() => onNavigate('home')}>
        <Text style={styles.linkButtonText}>홈으로</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatRow({ label, value }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.bigNumber}>{value}</Text>
    </View>
  );
}

function NotesScreen({ onNavigate }) {
  const missingNotes = useSelector(selectAllMissingNotes);
  const notes = Object.values(missingNotes).flat();

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>오답노트</Text>
      {notes.length === 0 ? (
        <Text style={styles.subtitle}>아직 오답이 없습니다.</Text>
      ) : (
        notes.map((note) => (
          <View key={note.id} style={styles.card}>
            <Text style={styles.cardLabel}>{note.cardId}</Text>
            <Text style={styles.studyDetail}>{note.correctAnswer}</Text>
          </View>
        ))
      )}
      <TouchableOpacity style={styles.linkButton} onPress={() => onNavigate('home')}>
        <Text style={styles.linkButtonText}>홈으로</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Tabs({ route, onNavigate }) {
  const tabs = [
    { key: 'home', label: '홈' },
    { key: 'study', label: '학습' },
    { key: 'statistics', label: '통계' },
    { key: 'notes', label: '오답노트' }
  ];
  return (
    <View style={styles.tabs}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.key} style={styles.tabButton} onPress={() => onNavigate(tab.key)}>
          <Text style={[styles.tabLabel, route === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Root() {
  const [route, setRoute] = useState('home');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCards({ cards: reviewItems }));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {route === 'home' && <HomeScreen onNavigate={setRoute} />}
      {route === 'study' && <StudyScreen onNavigate={setRoute} />}
      {route === 'statistics' && <StatisticsScreen onNavigate={setRoute} />}
      {route === 'notes' && <NotesScreen onNavigate={setRoute} />}
      <Tabs route={route} onNavigate={setRoute} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7'
  },
  screen: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1c1c1e'
  },
  subtitle: {
    fontSize: 15,
    color: '#6e6e73',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1
  },
  cardLabel: {
    fontSize: 13,
    color: '#6e6e73',
    marginBottom: 4
  },
  cardSub: {
    fontSize: 13,
    color: '#6e6e73',
    marginTop: 4
  },
  bigNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1c1c1e'
  },
  primaryButton: {
    backgroundColor: '#5856d6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center'
  },
  linkButtonText: {
    color: '#5856d6',
    fontSize: 14
  },
  studyDetail: {
    fontSize: 14,
    color: '#3a3a3c',
    lineHeight: 20
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    paddingVertical: 10
  },
  tabButton: {
    flex: 1,
    alignItems: 'center'
  },
  tabLabel: {
    fontSize: 13,
    color: '#8e8e93'
  },
  tabLabelActive: {
    color: '#5856d6',
    fontWeight: '700'
  }
});
