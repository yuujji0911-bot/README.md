// 망각곡선(Ebbinghaus) 기반 복습 스케줄 알고리즘
// 학습 데이터의 복습 시기를 자동으로 계산합니다

/**
 * 망각곡선 복습 스케줄
 * - 1일차: 초기 학습
 * - 1일 후: 복습 1차 (정기억도 100%)
 * - 3일 후: 복습 2차 (정기억도 98%)
 * - 7일 후: 복습 3차 (정기억도 97%)
 * - 14일 후: 복습 4차 (정기억도 96%)
 * - 30일 후: 복습 5차 (정기억도 95%+) → 완전 습득
 */

const REVIEW_SCHEDULE = [
  { stage: 0, daysAfter: 0, name: '초기 학습', retentionRate: 1.0 },
  { stage: 1, daysAfter: 1, name: '복습 1차', retentionRate: 1.0 },
  { stage: 2, daysAfter: 3, name: '복습 2차', retentionRate: 0.98 },
  { stage: 3, daysAfter: 7, name: '복습 3차', retentionRate: 0.97 },
  { stage: 4, daysAfter: 14, name: '복습 4차', retentionRate: 0.96 },
  { stage: 5, daysAfter: 30, name: '복습 5차', retentionRate: 0.95 }
];

const MAX_STAGE = 5; // 완전 습득 단계

/**
 * 다음 복습 날짜 계산
 * @param {Date} learnedDate - 학습한 날짜
 * @param {Number} currentStage - 현재 단계 (0-5)
 * @returns {Date} 다음 복습 날짜
 */
export const getNextReviewDate = (learnedDate, currentStage = 0) => {
  if (currentStage >= MAX_STAGE) {
    return null; // 완전 습득 상태
  }

  const schedule = REVIEW_SCHEDULE[currentStage + 1];
  if (!schedule) return null;

  const nextDate = new Date(learnedDate);
  nextDate.setDate(nextDate.getDate() + schedule.daysAfter);
  return nextDate;
};

/**
 * 복습이 필요한지 여부 확인
 * @param {Date} nextReviewDate - 다음 복습 날짜
 * @returns {Boolean} 복습 필요 여부
 */
export const isReviewDue = (nextReviewDate) => {
  if (!nextReviewDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reviewDate = new Date(nextReviewDate);
  reviewDate.setHours(0, 0, 0, 0);
  return today >= reviewDate;
};

/**
 * 정답 후 처리: 다음 단계로 진행
 * @param {Object} studyRecord - 학습 기록
 * @returns {Object} 업데이트된 기록
 */
export const handleCorrectAnswer = (studyRecord) => {
  const newStage = Math.min(studyRecord.stage + 1, MAX_STAGE);
  const learnedDate = studyRecord.learnedDate || new Date();
  const nextReviewDate = getNextReviewDate(learnedDate, newStage - 1);

  return {
    ...studyRecord,
    stage: newStage,
    lastReviewDate: new Date(),
    nextReviewDate,
    correctCount: (studyRecord.correctCount || 0) + 1,
    isCompleted: newStage === MAX_STAGE,
    lastStatus: 'correct'
  };
};

/**
 * 오답 후 처리: 처음부터 다시 시작
 * @param {Object} studyRecord - 학습 기록
 * @returns {Object} 업데이트된 기록
 */
export const handleWrongAnswer = (studyRecord) => {
  const learnedDate = new Date();
  const nextReviewDate = getNextReviewDate(learnedDate, 0);

  return {
    ...studyRecord,
    stage: 0,
    learnedDate,
    lastReviewDate: new Date(),
    nextReviewDate,
    incorrectCount: (studyRecord.incorrectCount || 0) + 1,
    isCompleted: false,
    lastStatus: 'wrong'
  };
};

/**
 * 현재 정기억 확률 계산 (지수 감소 함수)
 * @param {Date} lastReviewDate - 마지막 복습 날짜
 * @param {Number} stage - 현재 단계
 * @returns {Number} 0-1 사이의 정기억 확률
 */
export const calculateRetention = (lastReviewDate, stage) => {
  if (stage >= MAX_STAGE) return 1.0; // 완전 습득

  const daysPassed = Math.floor(
    (new Date() - new Date(lastReviewDate)) / (1000 * 60 * 60 * 24)
  );

  const stageRetention = REVIEW_SCHEDULE[stage]?.retentionRate || 1.0;
  
  // 지수 감소: retention = stageRetention * e^(-t/interval)
  // t: 경과 일수, interval: 복습 간격
  const decayFactor = Math.exp(-daysPassed / 7);
  
  return Math.max(0.1, stageRetention * decayFactor);
};

/**
 * 오늘 복습할 항목들 필터링
 * @param {Array} studyRecords - 모든 학습 기록
 * @returns {Array} 오늘 복습해야 할 기록들
 */
export const getTodayReviewItems = (studyRecords) => {
  return studyRecords.filter(record => {
    if (record.isCompleted) return false; // 완전 습득은 제외
    return isReviewDue(record.nextReviewDate);
  });
};

/**
 * 진도 현황 계산
 * @param {Array} studyRecords - 모든 학습 기록
 * @returns {Object} 진도 통계
 */
export const calculateProgress = (studyRecords) => {
  const total = studyRecords.length;
  const completed = studyRecords.filter(r => r.isCompleted).length;
  const reviewDue = getTodayReviewItems(studyRecords).length;
  
  const stageDistribution = {
    stage0: 0, // 초기 학습
    stage1: 0,
    stage2: 0,
    stage3: 0,
    stage4: 0,
    stage5: 0  // 완전 습득
  };

  studyRecords.forEach(record => {
    const stage = Math.min(record.stage || 0, 5);
    stageDistribution[`stage${stage}`]++;
  });

  return {
    total,
    completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    reviewDue,
    dueRate: total > 0 ? Math.round((reviewDue / total) * 100) : 0,
    stageDistribution,
    averageRetention: total > 0
      ? Math.round(
          (studyRecords.reduce((sum, r) => 
            sum + calculateRetention(r.lastReviewDate || new Date(), r.stage || 0), 0
          ) / total) * 100
        )
      : 0
  };
};

/**
 * 학습 통계 생성
 * @param {Array} studyRecords - 모든 학습 기록
 * @returns {Object} 상세 통계
 */
export const generateStatistics = (studyRecords) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // 오늘 학습
  const todayLearned = studyRecords.filter(r => {
    const reviewDate = new Date(r.lastReviewDate || r.learnedDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate.getTime() === today.getTime();
  }).length;

  // 이번 주 학습
  const weekLearned = studyRecords.filter(r => {
    const reviewDate = new Date(r.lastReviewDate || r.learnedDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate >= thisWeekStart && reviewDate <= today;
  }).length;

  // 이번 달 학습
  const monthLearned = studyRecords.filter(r => {
    const reviewDate = new Date(r.lastReviewDate || r.learnedDate);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate >= thisMonthStart && reviewDate <= today;
  }).length;

  // 정/오답률
  const totalAttempts = studyRecords.reduce((sum, r) => 
    sum + ((r.correctCount || 0) + (r.incorrectCount || 0)), 0
  );
  const totalCorrect = studyRecords.reduce((sum, r) => 
    sum + (r.correctCount || 0), 0
  );

  return {
    todayLearned,
    weekLearned,
    monthLearned,
    totalAttempts,
    correctCount: totalCorrect,
    incorrectCount: totalAttempts - totalCorrect,
    accuracy: totalAttempts > 0
      ? Math.round((totalCorrect / totalAttempts) * 100)
      : 0,
    ...calculateProgress(studyRecords)
  };
};

/**
 * 복습 스케줄 시각화 데이터
 * @param {Object} studyRecord - 학습 기록
 * @returns {Array} 각 단계별 상태
 */
export const getReviewScheduleVisualization = (studyRecord) => {
  return REVIEW_SCHEDULE.map((schedule, index) => {
    const isPassed = (studyRecord.stage || 0) > index;
    const isCurrent = (studyRecord.stage || 0) === index;
    const isDue = !isPassed && isReviewDue(studyRecord.nextReviewDate);

    let status = 'pending';
    if (isPassed) status = 'completed';
    if (isCurrent && isDue) status = 'due';
    if (isCurrent && !isDue) status = 'scheduled';

    return {
      stage: index,
      name: schedule.name,
      daysAfter: schedule.daysAfter,
      status, // 'pending' | 'scheduled' | 'due' | 'completed'
      retentionRate: schedule.retentionRate
    };
  });
};

/**
 * 학습 기록 초기화
 * @param {String} cardId - 카드 ID
 * @returns {Object} 초기화된 학습 기록
 */
export const createNewStudyRecord = (cardId) => {
  const now = new Date();
  return {
    cardId,
    stage: 0,
    learnedDate: now,
    lastReviewDate: now,
    nextReviewDate: getNextReviewDate(now, 0),
    correctCount: 0,
    incorrectCount: 0,
    isCompleted: false,
    lastStatus: 'new',
    createdAt: now,
    updatedAt: now
  };
};

export default {
  REVIEW_SCHEDULE,
  MAX_STAGE,
  getNextReviewDate,
  isReviewDue,
  handleCorrectAnswer,
  handleWrongAnswer,
  calculateRetention,
  getTodayReviewItems,
  calculateProgress,
  generateStatistics,
  getReviewScheduleVisualization,
  createNewStudyRecord
};
