// Redux 상태 관리 - 학습 데이터 슬라이스
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getNextReviewDate,
  handleCorrectAnswer,
  handleWrongAnswer,
  getTodayReviewItems,
  calculateProgress,
  generateStatistics,
  createNewStudyRecord
} from '../utils/ebbinghaus';

// 초기 상태
const initialState = {
  currentUnit: null,
  currentCardIndex: 0,
  cards: [], // 현재 단원의 모든 카드
  studyRecords: {}, // cardId -> 학습 기록 매핑
  progress: null,
  statistics: null,
  todayReviewItems: [],
  loading: false,
  error: null,
  lastUpdated: null
};

/**
 * 비동기 썽크: 단원 데이터 로드
 */
export const loadUnitData = createAsyncThunk(
  'study/loadUnitData',
  async (unitId, { rejectWithValue }) => {
    try {
      // 실제로는 Firebase에서 로드됨
      // 현재는 더미 데이터
      return { unitId, cards: [] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 학습 슬라이스
 */
const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    // 단원 설정
    setCurrentUnit: (state, action) => {
      state.currentUnit = action.payload;
      state.currentCardIndex = 0;
    },

    // 카드 초기화
    initializeCards: (state, action) => {
      const { cards } = action.payload;
      state.cards = cards;
      
      // 학습 기록 초기화 (첫 로드 시)
      cards.forEach(card => {
        if (!state.studyRecords[card.id]) {
          state.studyRecords[card.id] = createNewStudyRecord(card.id);
        }
      });
    },

    // 다음 카드로 이동
    goToNextCard: (state) => {
      if (state.currentCardIndex < state.cards.length - 1) {
        state.currentCardIndex += 1;
      }
    },

    // 이전 카드로 이동
    goToPreviousCard: (state) => {
      if (state.currentCardIndex > 0) {
        state.currentCardIndex -= 1;
      }
    },

    // 특정 카드로 이동
    goToCard: (state, action) => {
      const { index } = action.payload;
      if (index >= 0 && index < state.cards.length) {
        state.currentCardIndex = index;
      }
    },

    // 정답 처리
    markCorrect: (state, action) => {
      const { cardId } = action.payload;
      const currentRecord = state.studyRecords[cardId];
      
      if (currentRecord) {
        const updated = handleCorrectAnswer(currentRecord);
        state.studyRecords[cardId] = updated;
        
        // 진도 및 통계 업데이트
        state.progress = calculateProgress(Object.values(state.studyRecords));
        state.statistics = generateStatistics(Object.values(state.studyRecords));
        state.todayReviewItems = getTodayReviewItems(Object.values(state.studyRecords));
        state.lastUpdated = new Date().toISOString();
      }
    },

    // 오답 처리
    markWrong: (state, action) => {
      const { cardId } = action.payload;
      const currentRecord = state.studyRecords[cardId];
      
      if (currentRecord) {
        const updated = handleWrongAnswer(currentRecord);
        state.studyRecords[cardId] = updated;
        
        // 진도 및 통계 업데이트
        state.progress = calculateProgress(Object.values(state.studyRecords));
        state.statistics = generateStatistics(Object.values(state.studyRecords));
        state.todayReviewItems = getTodayReviewItems(Object.values(state.studyRecords));
        state.lastUpdated = new Date().toISOString();
      }
    },

    // 복습 필요 항목 업데이트
    updateTodayReview: (state) => {
      state.todayReviewItems = getTodayReviewItems(Object.values(state.studyRecords));
    },

    // 진도 업데이트
    updateProgress: (state) => {
      state.progress = calculateProgress(Object.values(state.studyRecords));
      state.statistics = generateStatistics(Object.values(state.studyRecords));
    },

    // 학습 기록 로드 (Firebase에서)
    loadStudyRecords: (state, action) => {
      state.studyRecords = action.payload;
      state.progress = calculateProgress(Object.values(state.studyRecords));
      state.statistics = generateStatistics(Object.values(state.studyRecords));
      state.todayReviewItems = getTodayReviewItems(Object.values(state.studyRecords));
      state.lastUpdated = new Date().toISOString();
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
    },

    // 전체 리셋
    resetStudy: (state) => {
      return initialState;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUnitData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUnitData.fulfilled, (state, action) => {
        state.loading = false;
        const { cards } = action.payload;
        state.cards = cards;
        
        // 학습 기록 초기화
        cards.forEach(card => {
          if (!state.studyRecords[card.id]) {
            state.studyRecords[card.id] = createNewStudyRecord(card.id);
          }
        });
      })
      .addCase(loadUnitData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// 액션 내보내기
export const {
  setCurrentUnit,
  initializeCards,
  goToNextCard,
  goToPreviousCard,
  goToCard,
  markCorrect,
  markWrong,
  updateTodayReview,
  updateProgress,
  loadStudyRecords,
  setLoading,
  setError,
  clearError,
  resetStudy
} = studySlice.actions;

// 셀렉터
export const selectCurrentUnit = (state) => state.study.currentUnit;
export const selectCurrentCard = (state) => {
  if (!state.study.cards[state.study.currentCardIndex]) return null;
  return state.study.cards[state.study.currentCardIndex];
};
export const selectCurrentCardId = (state) => {
  const card = state.study.cards[state.study.currentCardIndex];
  return card?.id;
};
export const selectCardStudyRecord = (state, cardId) => 
  state.study.studyRecords[cardId];
export const selectProgress = (state) => state.study.progress;
export const selectStatistics = (state) => state.study.statistics;
export const selectTodayReview = (state) => state.study.todayReviewItems;
export const selectLoading = (state) => state.study.loading;
export const selectError = (state) => state.study.error;
export const selectAllCards = (state) => state.study.cards;
export const selectCurrentCardIndex = (state) => state.study.currentCardIndex;

export default studySlice.reducer;
