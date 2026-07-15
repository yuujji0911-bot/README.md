// Redux 상태 관리 - 오답노트 슬라이스
import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
  missingNotes: {}, // cardId -> 오답 기록 배열
  totalMissing: 0,
  filterBy: 'all', // 'all' | 'today' | 'thisWeek' | 'thisMonth'
  sortBy: 'recent', // 'recent' | 'oldest' | 'frequency'
  loading: false,
  error: null
};

/**
 * 오답노트 슬라이스
 */
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // 오답 기록 추가
    addMissingNote: (state, action) => {
      const { cardId, answer, correctAnswer, timestamp, unitId, sectionId } = action.payload;

      if (!state.missingNotes[cardId]) {
        state.missingNotes[cardId] = [];
      }

      const newNote = {
        id: `${cardId}-${Date.now()}`,
        cardId,
        unitId,
        sectionId,
        answer,
        correctAnswer,
        timestamp: timestamp || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        isReviewed: false,
        reviewCount: 0
      };

      state.missingNotes[cardId].push(newNote);
      state.totalMissing += 1;
    },

    // 오답 항목 삭제
    removeMissingNote: (state, action) => {
      const { cardId, noteId } = action.payload;

      if (state.missingNotes[cardId]) {
        const index = state.missingNotes[cardId].findIndex(note => note.id === noteId);
        if (index !== -1) {
          state.missingNotes[cardId].splice(index, 1);
          state.totalMissing -= 1;

          // cardId에 오답이 없으면 삭제
          if (state.missingNotes[cardId].length === 0) {
            delete state.missingNotes[cardId];
          }
        }
      }
    },

    // 오답 항목 검토 완료 표시
    markNoteAsReviewed: (state, action) => {
      const { cardId, noteId } = action.payload;

      if (state.missingNotes[cardId]) {
        const note = state.missingNotes[cardId].find(n => n.id === noteId);
        if (note) {
          note.isReviewed = true;
          note.reviewedAt = new Date().toISOString();
        }
      }
    },

    // 복습 횟수 증가
    incrementReviewCount: (state, action) => {
      const { cardId, noteId } = action.payload;

      if (state.missingNotes[cardId]) {
        const note = state.missingNotes[cardId].find(n => n.id === noteId);
        if (note) {
          note.reviewCount += 1;
          note.lastReviewedAt = new Date().toISOString();
        }
      }
    },

    // 카드의 모든 오답 삭제
    clearCardNotes: (state, action) => {
      const { cardId } = action.payload;

      if (state.missingNotes[cardId]) {
        state.totalMissing -= state.missingNotes[cardId].length;
        delete state.missingNotes[cardId];
      }
    },

    // 전체 오답 삭제
    clearAllNotes: (state) => {
      state.missingNotes = {};
      state.totalMissing = 0;
    },

    // 필터 변경
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    },

    // 정렬 변경
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    // 오답노트 로드 (Firebase에서)
    loadMissingNotes: (state, action) => {
      const notes = action.payload;
      state.missingNotes = {};
      let total = 0;

      notes.forEach(note => {
        const { cardId } = note;
        if (!state.missingNotes[cardId]) {
          state.missingNotes[cardId] = [];
        }
        state.missingNotes[cardId].push(note);
        total += 1;
      });

      state.totalMissing = total;
    },

    // 로딩 상태
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 에러 처리
    setError: (state, action) => {
      state.error = action.payload;
    },

    // 에러 초기화
    clearError: (state) => {
      state.error = null;
    }
  }
});

// 액션 내보내기
export const {
  addMissingNote,
  removeMissingNote,
  markNoteAsReviewed,
  incrementReviewCount,
  clearCardNotes,
  clearAllNotes,
  setFilter,
  setSortBy,
  loadMissingNotes,
  setLoading,
  setError,
  clearError
} = notesSlice.actions;

// 셀렉터 - 기본
export const selectAllMissingNotes = (state) => state.notes.missingNotes;
export const selectTotalMissing = (state) => state.notes.totalMissing;
export const selectFilter = (state) => state.notes.filterBy;
export const selectSortBy = (state) => state.notes.sortBy;
export const selectLoading = (state) => state.notes.loading;
export const selectError = (state) => state.notes.error;

// 셀렉터 - 특정 카드의 오답
export const selectCardMissingNotes = (state, cardId) =>
  state.notes.missingNotes[cardId] || [];

// 셀렉터 - 필터링된 오답 (날짜별)
export const selectFilteredMissingNotes = (state) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  let filtered = [];

  Object.values(state.notes.missingNotes).forEach(notes => {
    notes.forEach(note => {
      const noteDate = new Date(note.createdAt);
      const noteDateOnly = new Date(noteDate.getFullYear(), noteDate.getMonth(), noteDate.getDate());

      switch (state.notes.filterBy) {
        case 'today':
          if (noteDateOnly.getTime() === today.getTime()) {
            filtered.push(note);
          }
          break;
        case 'thisWeek':
          if (noteDateOnly >= weekStart && noteDateOnly <= today) {
            filtered.push(note);
          }
          break;
        case 'thisMonth':
          if (noteDateOnly >= monthStart && noteDateOnly <= today) {
            filtered.push(note);
          }
          break;
        case 'all':
        default:
          filtered.push(note);
          break;
      }
    });
  });

  // 정렬
  filtered.sort((a, b) => {
    switch (state.notes.sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'frequency':
        return b.reviewCount - a.reviewCount;
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return filtered;
};

// 셀렉터 - 미검토 오답
export const selectUnreviewedNotes = (state) => {
  let unreviewedCount = 0;

  Object.values(state.notes.missingNotes).forEach(notes => {
    notes.forEach(note => {
      if (!note.isReviewed) {
        unreviewedCount += 1;
      }
    });
  });

  return unreviewedCount;
};

// 셀렉터 - 통계
export const selectMissingNotesStatistics = (state) => {
  const allNotes = Object.values(state.notes.missingNotes).flat();
  
  const totalAttempts = allNotes.length;
  const reviewedCount = allNotes.filter(note => note.isReviewed).length;
  const unreviewedCount = totalAttempts - reviewedCount;
  
  const frequency = {};
  const cardFrequency = {};
  
  allNotes.forEach(note => {
    // 문제 유형별 빈도
    frequency[note.sectionId] = (frequency[note.sectionId] || 0) + 1;
    // 카드별 오답 횟수
    cardFrequency[note.cardId] = (cardFrequency[note.cardId] || 0) + 1;
  });

  // 가장 자주 틀린 카드 Top 5
  const topMissedCards = Object.entries(cardFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cardId, count]) => ({ cardId, count }));

  // 가장 자주 틀린 섹션
  const topMissedSections = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([sectionId, count]) => ({ sectionId, count }));

  return {
    totalAttempts,
    reviewedCount,
    unreviewedCount,
    reviewRate: totalAttempts > 0 ? Math.round((reviewedCount / totalAttempts) * 100) : 0,
    topMissedCards,
    topMissedSections,
    averageReviewCount: totalAttempts > 0
      ? Math.round(allNotes.reduce((sum, note) => sum + note.reviewCount, 0) / totalAttempts)
      : 0
  };
};

// 셀렉터 - 오답 경향
export const selectMissingTrends = (state) => {
  const allNotes = Object.values(state.notes.missingNotes).flat();
  const trends = {};

  allNotes.forEach(note => {
    const date = new Date(note.createdAt);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

    if (!trends[dateKey]) {
      trends[dateKey] = 0;
    }
    trends[dateKey] += 1;
  });

  return Object.entries(trends)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, count]) => ({ date, count }));
};

export default notesSlice.reducer;
