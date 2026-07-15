# 복습노트 (Revision Note) - 망각곡선 기반 학습 앱

영문법 마스터를 위한 간격반복 학습 모바일 앱입니다.
망각곡선(Ebbinghaus)을 기반으로 최적의 복습 시기를 자동으로 제시합니다.

## 🎯 핵심 기능

### 1. 망각곡선 기반 자동 복습 스케줄
- **1일 후** → **3일 후** → **7일 후** → **14일 후** → **30일 후**
- 각 단계별 학습 현황 자동 추적
- 최적의 복습 타이밍 알림

### 2. 진도 추적
- 일일 학습 현황
- 섹션별 완료 상태
- 총 진도율 실시간 업데이트

### 3. 학습 통계
- 오늘 학습량
- 이번 주 학습량
- 전체 진도율
- 복습 필요 항목 수
- 학습 데이터 시각화

### 4. 오답노트
- 틀린 문제 자동 기록
- 오답 분석
- 오답 전용 복습 모드

### 5. 클라우드 동기화
- Firebase 연동
- 다중 기기 동기화
- 자동 백업

## 🛠 기술 스택

- **Frontend**: React Native + Expo
- **Backend**: Firebase (Firestore + Authentication)
- **State Management**: Redux Toolkit
- **UI**: React Native Paper
- **Storage**: AsyncStorage (로컬) + Firestore (클라우드)
- **Authentication**: Firebase Auth (Google, Email)

## 📂 프로젝트 구조

```
README.md/
├── app.json                    # Expo 설정
├── package.json                # 의존성
├── babel.config.js             # Babel 설정
├── .env.example                # 환경변수 예시
├── .gitignore
├── src/
│   ├── screens/                # 화면 컴포넌트
│   │   ├── LoginScreen.js      # 로그인
│   │   ├── HomeScreen.js       # 홈 (진도표)
│   │   ├── StudyScreen.js      # 학습 화면
│   │   ├── StatisticsScreen.js # 통계
│   │   └── MissingNotesScreen.js # 오답노트
│   ├── components/             # 재사용 컴포넌트
│   │   ├── BlankCard.js        # 빈칸 카드
│   │   ├── StatCard.js         # 통계 카드
│   │   ├── ReviewSchedule.js   # 복습 스케줄
│   │   ├── ProgressBar.js      # 진도바
│   │   └── Header.js           # 헤더
│   ├── redux/                  # Redux 상태관리
│   │   ├── store.js            # Store 설정
│   │   ├── slices/
│   │   │   ├── studySlice.js   # 학습 상태
│   │   │   ├── notesSlice.js   # 오답노트 상태
│   │   │   └── authSlice.js    # 인증 상태
│   ├── services/               # 외부 서비스
│   │   ├── firebaseConfig.js   # Firebase 설정
│   │   ├── authService.js      # 인증 로직
│   │   ├── studyService.js     # 학습 로직
│   │   └── firebaseService.js  # Firestore 통신
│   ├── utils/                  # 유틸리티
│   │   ├── ebbinghaus.js       # 망각곡선 알고리즘
│   │   ├── dateUtils.js        # 날짜 유틸
│   │   ├── constants.js        # 상수
│   │   └── validators.js       # 유효성 검사
│   ├── data/                   # 학습 자료
│   │   ├── grammarData.js      # 문법 데이터
│   │   └── units.json          # 단원 정보
│   ├── hooks/                  # 커스텀 훅
│   │   ├── useStudyProgress.js # 진도 추적
│   │   ├── useEbbinghaus.js    # 망각곡선
│   │   └── useFirebase.js      # Firebase
│   ├── navigation/             # 네비게이션
│   │   └── RootNavigator.js    # 라우팅 설정
│   ├── styles/                 # 전역 스타일
│   │   ├── colors.js           # 색상
│   │   ├── spacing.js          # 간격
│   │   └── typography.js       # 타이포그래피
│   └── App.js                  # 앱 진입점
├── assets/
│   ├── data/
│   │   └── grammar-units.json  # 학습 자료 JSON
│   ├── images/
│   │   └── logo.png
│   └── fonts/
├── docs/
│   ├── SETUP.md                # 설치 가이드
│   ├── API.md                  # API 문서
│   ├── EBBINGHAUS.md           # 망각곡선 설명
│   └── FEATURES.md             # 기능 설명
└── .github/
    └── workflows/
        └── ci.yml              # CI/CD
```

## 📚 학습 자료 구성

### Unit 1: 접속사·전치사 (7/13)
- 전치사 vs 부사절 접속사
- 등위·상관접속사
- 형용사절·명사절
- 접속부사

### Unit 2: 품사 구분 (7/14)
- 부사 vs 접속사 vs 전치사

### Unit 3: 동사 + 전치사 (7/14)
- ~in, ~for 등 고정 표현

### Unit 4: 준동사 (7/13)
- to부정사, 동명사, 분사

### Unit 5: 5형식 (7/14)
- 목적격 보어
- RICEPA 패턴

### Unit 6: 어휘 (7/14)
- 콜로케이션
- 어형 함정

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 14+ 
- npm 또는 yarn
- Expo CLI
- Firebase 계정

### 설치

```bash
# 1. 저장소 클론
git clone https://github.com/yuujji0911-bot/README.md.git
cd README.md

# 2. 의존성 설치
npm install
# 또는
yarn install

# 3. 환경변수 설정
cp .env.example .env
# .env 파일에 Firebase 설정 입력

# 4. 개발 서버 실행
npx expo start

# 5. 모바일 기기에서 Expo 앱으로 스캔
```

## 🔐 환경변수 설정

`.env` 파일 생성:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📖 학습 흐름

```
1. 로그인
   ↓
2. 학습 화면 진입
   ↓
3. 빈칸 카드 학습 (정답/오답 선택)
   ↓
4. 정답 확인
   ↓
5. 틀린 문제 → 자동 오답노트 추가
   ↓
6. 학습 통계 업데이트
   ↓
7. 망각곡선 기반 복습 스케줄 생성
   ↓
8. 복습 알림 (예정)
```

## 📊 망각곡선 알고리즘

```
초기 학습 (1일차)
     ↓ (1일 후)
복습 1차 (1일) - 정기억도 100%
     ↓ (3일 후)
복습 2차 (3일) - 정기억도 98%
     ↓ (7일 후)
복습 3차 (7일) - 정기억도 97%
     ↓ (14일 후)
복습 4차 (14일) - 정기억도 96%
     ↓ (30일 후)
복습 5차 (30일) - 완전 습득!
```

각 복습 단계에서 오답 시 → 1일차부터 재시작

## 🔧 주요 기술 상세

### Firebase 구조

```
users/
  ├── {userId}
  │   ├── email
  │   ├── displayName
  │   └── createdAt

study/
  ├── {userId}
  │   ├── sessions/
  │   │   ├── {sessionId}
  │   │   │   ├── unitId
  │   │   │   ├── cardId
  │   │   │   ├── isCorrect
  │   │   │   ├── timestamp
  │   │   │   └── nextReviewDate

oAnswers/
  ├── {userId}
  │   ├── {cardId}
  │   │   ├── attempts
  │   │   ├── correctCount
  │   │   └── lastAttempt
```

### Redux 상태 구조

```javascript
{
  auth: {
    user: null,
    loading: false,
    error: null
  },
  study: {
    currentUnit: null,
    cards: [],
    progress: 0,
    todayCount: 0,
    reviewSchedule: []
  },
  notes: {
    missingAnswers: [],
    totalMissing: 0
  }
}
```

## 📱 화면 구성

### 1. 로그인 화면
- 이메일/비밀번호 로그인
- Google 로그인
- 회원가입

### 2. 홈 화면
- 전체 진도
- 오늘 학습량
- 복습 필요 항목
- 학습 시작 버튼

### 3. 학습 화면
- 빈칸 카드 표시
- 정답/오답 선택
- 다음 카드 넘기기
- 학습 진행도

### 4. 통계 화면
- 일간/주간/월간 통계
- 그래프 시각화
- 복습 스케줄 표시

### 5. 오답노트 화면
- 틀린 문제 목록
- 오답 분석
- 오답 전용 복습 모드

## 🎓 학습 알고리즘

```javascript
// 망각곡선 계산
const reviewSchedule = [
  { day: 1, interval: 1 },      // 1일 후
  { day: 3, interval: 3 },      // 3일 후
  { day: 7, interval: 7 },      // 7일 후
  { day: 14, interval: 14 },    // 14일 후
  { day: 30, interval: 30 }     // 30일 후
];

// 정기억도 계산
const retentionRate = Math.pow(0.99, daysSinceLearning);
```

## 🧪 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:coverage
```

## 📦 배포

### iOS
```bash
eas build --platform ios
eas submit --platform ios
```

### Android
```bash
eas build --platform android
eas submit --platform android
```

## 🤝 기여

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - see LICENSE file for details

## 📞 지원

문제가 있으신가요? [Issues](https://github.com/yuujji0911-bot/README.md/issues) 페이지에서 보고해주세요.

## 🙏 감사

- 서아쌤 - 문법 자료 제공
- Ebbinghaus - 망각곡선 이론
- Firebase - 백엔드 인프라
- React Native 커뮤니티

---

Made with ❤️ for English Grammar Mastery

**Last Updated**: 2026-07-15
