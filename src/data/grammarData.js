// 현재 HTML 자료를 JSON으로 변환한 영문법 학습 데이터
// Unit별로 구성되어 있으며, 각 카드는 빈칸 형식입니다.

export const grammarUnits = [
  {
    id: 'unit-1',
    name: '접속사·전치사 통합',
    date: '7/13',
    source: '서아쌤 마스터표',
    description: '전치사, 등위·상관접속사, 부사절·명사절·형용사절 접속사',
    sections: [
      {
        id: 'sec-1-1',
        title: '⭐ 의미별 대응: 전치사(+명사) vs 부사절 접속사(+S+V)',
        type: 'comparison',
        cards: [
          {
            id: 'card-1-1-1',
            meaning: '이유',
            preposition: 'because of, due to, owing to, on account of',
            conjunction: 'because, since, as, now that',
            difficulty: 80,
            category: 'preposition'
          },
          {
            id: 'card-1-1-2',
            meaning: '양보',
            preposition: 'despite, in spite of, notwithstanding',
            conjunction: 'although, though, even if, even though, whereas',
            difficulty: 80,
            category: 'preposition'
          },
          {
            id: 'card-1-1-3',
            meaning: '~동안',
            preposition: 'during, for',
            conjunction: 'while',
            difficulty: 80,
            category: 'preposition'
          },
          {
            id: 'card-1-1-4',
            meaning: '전/후',
            preposition: 'after, following, before, prior to',
            conjunction: 'after, before',
            difficulty: 80,
            category: 'preposition'
          },
          {
            id: 'card-1-1-5',
            meaning: '~경우 대비',
            preposition: 'in case of, in the event of',
            conjunction: 'in case (that), in the event (that)',
            difficulty: 80,
            category: 'preposition'
          },
          {
            id: 'card-1-1-6',
            meaning: '목적',
            preposition: 'so as to V, in order to V',
            conjunction: 'so that, in order that',
            difficulty: 80,
            category: 'preposition'
          },
          {
            id: 'card-1-1-7',
            meaning: '결과',
            preposition: 'as a result of',
            conjunction: '—',
            difficulty: 80,
            category: 'preposition'
          }
        ]
      },
      {
        id: 'sec-1-2',
        title: '부사절 접속사 — 시간 · 조건',
        type: 'pills',
        cards: [
          {
            id: 'card-1-2-1',
            category: '시간',
            items: ['once', 'as soon as', 'after', 'before', 'when', 'as', 'while', 'until', 'since'],
            note: '뒤에 S+V → 접속사 / 명사만 → 전치사',
            difficulty: 95
          },
          {
            id: 'card-1-2-2',
            category: '조건',
            items: ['if', 'provided (that)', 'assuming (that)', 'unless', 'as long as', 'in case (that)', 'in the event (that)'],
            note: '뒤에 S+V → 접속사 / 명사만 → 전치사',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-1-3',
        title: '등위 & 상관접속사',
        type: 'structured',
        cards: [
          {
            id: 'card-1-3-1',
            title: '등위접속사',
            content: 'and, but, or, so, yet',
            rules: [
              'both A and B (복수동사)',
              'either A or B · neither A nor B',
              'not only A but (also) B · B as well as A · not A but B'
            ],
            note: 'both A and B만 복수 / 나머지는 B에 수일치 · 문두 Not only → 도치',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-1-4',
        title: '형용사절 = 관계사',
        type: 'table',
        cards: [
          {
            id: 'card-1-4-1',
            antecedent: '사람',
            subject: 'who',
            object: 'who(m)',
            possessive: 'whose',
            difficulty: 80
          },
          {
            id: 'card-1-4-2',
            antecedent: '사물',
            subject: 'which',
            object: 'which',
            possessive: 'whose',
            difficulty: 80
          },
          {
            id: 'card-1-4-3',
            antecedent: '사람/사물',
            subject: 'that',
            object: 'that',
            possessive: '—',
            difficulty: 80
          }
        ],
        notes: [
          '주관대·목관대 + 불완전 / 소관대 + 완전',
          '목관대 단독 생략 · 주관대+be 동반 생략',
          '수일치 = 선행사 기준 · 소관대는 무관사 명사',
          '콤마 뒤 that 불가'
        ]
      },
      {
        id: 'sec-1-5',
        title: '명사절 접속사',
        type: 'content',
        cards: [
          {
            id: 'card-1-5-1',
            connector: 'that',
            meaning: '~라는 것',
            usage: '주어·타V목적어·보어',
            note: '타/목 생략 가능',
            difficulty: 80
          },
          {
            id: 'card-1-5-2',
            connector: '동격 that',
            meaning: 'the fact/news/idea/suggestion/claim…',
            usage: '완전문장',
            difficulty: 80
          },
          {
            id: 'card-1-5-3',
            connector: 'whether',
            meaning: '~인지',
            usage: '4자리 다 O · whether (or not) · whether A or B',
            difficulty: 80
          },
          {
            id: 'card-1-5-4',
            connector: 'if',
            meaning: '~인지',
            usage: '타동사 목적어만',
            note: 'if or not ✗',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-1-6',
        title: '접속부사',
        type: 'pills',
        cards: [
          {
            id: 'card-1-6-1',
            items: [
              'however', 'on the other hand', 'on the contrary', 'conversely',
              'therefore', 'thus', 'hence',
              'accordingly', 'consequently',
              'for example', 'for instance',
              'besides', 'in addition', 'moreover', 'furthermore',
              'nevertheless', 'nonetheless', 'notwithstanding',
              'as a result'
            ],
            note: 'S+V. 접속부사, S+V. — 두 절 연결 못함',
            difficulty: 80
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    name: '품사 구분',
    date: '7/14',
    source: '뒤에 뭐가 오나로 판단',
    description: '부사 vs 접속사 vs 전치사를 뒤에 오는 요소로 판단',
    sections: [
      {
        id: 'sec-2-1',
        title: '부사 — 단독 · 절 연결 ✗',
        type: 'pills',
        cards: [
          {
            id: 'card-2-1-1',
            items: [
              'Also', 'Then', 'Soon', 'Rarely',
              'Somehow', 'Instead', 'Consequently', 'Likewise',
              'Nevertheless', 'Furthermore', 'However'
            ],
            note: 'Apart는 단독보다 apart from = ~외에도 (전치사) 로 출제',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-2-2',
        title: '접속사 — 뒤에 절 (S+V)',
        type: 'content',
        cards: [
          {
            id: 'card-2-2-1',
            expression: 'As though',
            meaning: '마치 ~인 것처럼',
            difficulty: 95
          },
          {
            id: 'card-2-2-2',
            expression: 'Each time',
            meaning: '~할 때마다',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-2-3',
        title: '전치사 — 뒤에 명사',
        type: 'content',
        cards: [
          {
            id: 'card-2-3-1',
            expression: 'Up to',
            meaning: '~까지',
            difficulty: 95
          },
          {
            id: 'card-2-3-2',
            expression: 'Rather than',
            meaning: '~보다는',
            difficulty: 95
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    name: '동사 + 전치사 짝꿍',
    date: '7/14',
    source: '고정 표현 — 통암기',
    description: '동사와 함께 사용되는 전치사 표현',
    sections: [
      {
        id: 'sec-3-1',
        title: '~ in',
        type: 'pills',
        cards: [
          {
            id: 'card-3-1-1',
            preposition: 'in',
            expressions: [
              { term: 'succeed in', meaning: '성공하다' },
              { term: 'specialize in', meaning: '전문으로 하다' },
              { term: 'invest in', meaning: '투자하다' },
              { term: 'be involved in', meaning: '관여하다' },
              { term: 'participate in', meaning: '참가하다' },
              { term: 'result in', meaning: '~을 초래하다' },
              { term: 'enroll in', meaning: '등록하다' }
            ],
            tip: 'succeed in(성공) ↔ succeed 명사(뒤를 잇다)',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-3-2',
        title: '~ for',
        type: 'pills',
        cards: [
          {
            id: 'card-3-2-1',
            preposition: 'for',
            expressions: [
              { term: 'be responsible for', meaning: '책임이 있다' },
              { term: 'account for', meaning: '차지하다 · 설명하다' },
              { term: 'prepare for', meaning: '대비하다' },
              { term: 'search for', meaning: '찾다' },
              { term: 'compensate for', meaning: '보상하다' },
              { term: 'apply for', meaning: '지원하다' }
            ],
            tip: 'apply for(지원) ↔ apply to(적용되다)',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-3-3',
        title: '⭐ 연결: to + Ving',
        type: 'callout',
        cards: [
          {
            id: 'card-3-3-1',
            note: 'to는 전치사 (동사원형 ✗)',
            expressions: [
              'contribute / look forward / object to Ving',
              'be dedicated / devoted / committed to Ving · be used to Ving(익숙)',
              'used to V=하곤 했다 · be used to V=쓰이다'
            ],
            difficulty: 95
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    name: '준동사',
    date: '7/13',
    source: '서아쌤 Unit 7',
    description: 'to부정사, 동명사, 분사의 구분과 용법',
    sections: [
      {
        id: 'sec-4-1',
        title: 'to① 명사적',
        type: 'content',
        cards: [
          {
            id: 'card-4-1-1',
            pattern: 'It + be + 형 + to V',
            meaning: 'for+목적격=의미상 주어',
            adjectives: ['difficult', 'hard', 'easy', 'possible', 'important', 'necessary', 'convenient'],
            difficulty: 80
          },
          {
            id: 'card-4-1-2',
            meaning: '3형식: 동사의 목적어로 to V',
            verbs: ['aim', 'hope', 'need', 'want', 'plan', 'promise', 'pretend', 'desire', 'decide', 'determine', 'learn', 'refuse', 'manage', 'strive'],
            difficulty: 80
          }
        ]
      },
      {
        id: 'sec-4-2',
        title: 'to② 형용사적·부사적',
        type: 'content',
        cards: [
          {
            id: 'card-4-2-1',
            usage: '명사 수식',
            nouns: ['way', 'plan', 'ability', 'chance', 'opportunity', 'time', 'need', 'effort', 'right', 'decision', 'intention', 'authority'],
            difficulty: 80
          },
          {
            id: 'card-4-2-2',
            usage: '목적',
            pattern: 'to V = in order to V = so as to V',
            clausePattern: 'so that / in order that',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-4-3',
        title: '동① 동명사만 목적어로',
        type: 'content',
        cards: [
          {
            id: 'card-4-3-1',
            verbs: ['mind', 'enjoy', 'give up', 'admit', 'postpone', 'put off', 'practice', 'recommend', 'suggest', 'finish', 'avoid', 'risk', 'deny', 'discourage', 'dislike', 'consider'],
            example: 'Do you mind opening the window?',
            difficulty: 80
          }
        ]
      },
      {
        id: 'sec-4-4',
        title: '동② 동명사 관용표현',
        type: 'content',
        cards: [
          {
            id: 'card-4-4-1',
            expressions: [
              'cannot help Ving',
              'have difficulty/trouble (in) Ving',
              'go Ving',
              'be busy (in) Ving',
              'spend 시간/돈 Ving',
              'feel like Ving',
              'be worth Ving',
              'It is no use Ving'
            ],
            difficulty: 80
          }
        ]
      },
      {
        id: 'sec-4-5',
        title: '분사 — p.p로 굳어진 형용사',
        type: 'content',
        cards: [
          {
            id: 'card-4-5-1',
            adjectives: [
              { term: 'detailed', meaning: '상세한' },
              { term: 'written', meaning: '서면의' },
              { term: 'designated', meaning: '지정된' },
              { term: 'skilled', meaning: '숙련된' },
              { term: 'distinguished', meaning: '저명한' },
              { term: 'accomplished', meaning: '뛰어난' },
              { term: 'renowned', meaning: '명성 있는' },
              { term: 'damaged', meaning: '하자 생긴' },
              { term: 'customized', meaning: '맞춤형의' }
            ],
            note: '감정분사: -ed 수동·주어가 느낌(사람) / -ing 능동·주어가 유발(사물)',
            difficulty: 80
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    name: '5형식',
    date: '7/14',
    source: 'S + V + O + O.C',
    description: '목적격 보어의 다양한 형태',
    sections: [
      {
        id: 'sec-5-1',
        title: 'O.C = to부정사',
        type: 'content',
        cards: [
          {
            id: 'card-5-1-1',
            verbs: [
              'want', 'ask', 'tell', 'allow',
              'expect', 'advise', 'encourage', 'force',
              'permit', 'remind', 'enable'
            ],
            example: 'The system enables us to track orders.',
            difficulty: 80
          }
        ]
      },
      {
        id: 'sec-5-2',
        title: 'O.C = 동사원형 (사역 · 지각)',
        type: 'content',
        cards: [
          {
            id: 'card-5-2-1',
            category: '사역',
            verbs: ['make', 'have', 'let'],
            note: '수동 관계면 p.p',
            example: 'She had the report revised.',
            difficulty: 80
          },
          {
            id: 'card-5-2-2',
            category: '지각',
            verbs: ['see', 'watch', 'hear', 'feel', 'smell', 'notice'],
            note: '원형/-ing · 수동이면 p.p',
            warning: 'help는 예외 → help + O + (to) V 둘 다 O',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-5-3',
        title: '⭐ RICEPA — 수동태로 바뀌면 be p.p + to do',
        type: 'callout',
        cards: [
          {
            id: 'card-5-3-1',
            patterns: [
              { letter: 'R', verbs: ['required', 'reminded'] },
              { letter: 'I', verbs: ['invited', 'instructed'] },
              { letter: 'C', verbs: ['caused'] },
              { letter: 'E', verbs: ['expected', 'enabled', 'encouraged'] },
              { letter: 'P', verbs: ['permitted'] },
              { letter: 'A', verbs: ['advised', 'asked', 'allowed'] }
            ],
            example: 'All employees are permitted to work from home.',
            difficulty: 95
          }
        ]
      },
      {
        id: 'sec-5-4',
        title: 'O.C = 형용사 / 명사',
        type: 'content',
        cards: [
          {
            id: 'card-5-4-1',
            verbs: [
              'keep', 'make', 'find', 'consider',
              'call', 'name', 'appoint', 'elect'
            ],
            examples: [
              'We found the process inefficient. (형용사)',
              'The board appointed her director. (명사)'
            ],
            warning: '여기 자리에 부사 절대 못 옴 — Part 5 단골!',
            difficulty: 80
          }
        ]
      }
    ]
  }
];

// 어휘 데이터
export const vocabularyData = [
  {
    id: 'vocab-1',
    unit: 'unit-6',
    category: '어휘',
    date: '7/14',
    items: [
      {
        id: 'v-1',
        term: 'rest assured',
        meaning: '안심하다',
        usage: 'Rest assured that ~',
        difficulty: 80
      },
      {
        id: 'v-2',
        term: 'assurance',
        meaning: '보증, 확언',
        usage: '명사',
        difficulty: 80
      },
      {
        id: 'v-3',
        term: 'disruptive',
        meaning: '지장을 주는',
        usage: '형용사',
        difficulty: 80
      },
      {
        id: 'v-4',
        term: 'disruption',
        meaning: '중단, 혼란',
        usage: 'vs distribution (유통)',
        difficulty: 95
      },
      {
        id: 'v-5',
        term: 'decidedly',
        meaning: '단연코, 확실히',
        usage: '부사',
        difficulty: 80
      },
      {
        id: 'v-6',
        term: 'deduction',
        meaning: '공제',
        usage: 'tax ~',
        difficulty: 80
      },
      {
        id: 'v-7',
        term: 'duplicate',
        meaning: '복제, 사본 / 중복의',
        usage: '명·동·형',
        difficulty: 80
      },
      {
        id: 'v-8',
        term: 'declaration',
        meaning: '선언, 신고',
        usage: 'customs ~',
        difficulty: 80
      },
      {
        id: 'v-9',
        term: 'dedication',
        meaning: '헌신, 전념',
        usage: 'be dedicated to Ving',
        difficulty: 80
      },
      {
        id: 'v-10',
        term: 'consensus',
        meaning: '합의',
        usage: 'reach a ~',
        difficulty: 80
      },
      {
        id: 'v-11',
        term: 'initiative',
        meaning: '계획, 주도권, 진취성',
        usage: '여러 뜻!',
        difficulty: 95
      },
      {
        id: 'v-12',
        term: 'ambitious',
        meaning: '야심 찬',
        usage: '~ plan / goal',
        difficulty: 80
      },
      {
        id: 'v-13',
        term: 'solicit',
        meaning: '요청하다',
        usage: '~ feedback',
        difficulty: 80
      },
      {
        id: 'v-14',
        term: 'border',
        meaning: '테두리, 국경',
        usage: '동: 접하다',
        difficulty: 80
      },
      {
        id: 'v-15',
        term: 'fixed price',
        meaning: '고정 가격',
        usage: '—',
        difficulty: 80
      }
    ]
  },
  {
    id: 'vocab-2',
    unit: 'unit-6',
    category: '어형 함정',
    date: '7/14',
    items: [
      {
        id: 'v-trap-1',
        adjective: 'disruptive',
        noun: 'disruption',
        warning: 'distribution (유통) 혼동 주의',
        difficulty: 95
      },
      {
        id: 'v-trap-2',
        adjective: 'dedicated',
        noun: 'dedication',
        warning: 'deduction (공제) 혼동 주의',
        difficulty: 95
      },
      {
        id: 'v-trap-3',
        adjective: 'assured',
        noun: 'assurance',
        usage: 'rest assured',
        difficulty: 80
      },
      {
        id: 'v-trap-4',
        adjective: 'responsible',
        noun: 'responsibility',
        warning: 'responsive (반응 빠른) 혼동 주의',
        difficulty: 95
      },
      {
        id: 'v-trap-5',
        adjective: 'common',
        noun: 'commoner',
        usage: '부사비교: more commonly',
        difficulty: 95
      },
      {
        id: 'v-trap-6',
        term: 'line',
        meanings: {
          noun: '줄, 선, 경계, 안감',
          verb: '안감을 대다, 받치다, 줄을 긋다'
        },
        examples: ['product line', 'assembly line', 'in line with'],
        difficulty: 80
      }
    ]
  }
];

// Part 5 오답 분석 데이터
export const part5MistakesData = [
  {
    id: 'mistake-1',
    number: 1,
    category: '최상급 · common',
    pattern: 'one of + the most + 형 + 복수N',
    mistakes: [
      { wrong: 'commoner', meaning: '서민' },
      { correct: 'more commonly', meaning: '더 흔히' }
    ],
    difficulty: 95
  },
  {
    id: 'mistake-2',
    number: 2,
    category: '타동사·분사구문',
    example: '…deepened the harbor, allowing it to accommodate the largest ships.',
    difficulty: 80
  },
  {
    id: 'mistake-3',
    number: 3,
    category: 'responsible',
    mistakes: [
      { wrong: 'responsibility', reason: '동격 ✗' },
      { correct: 'responsible for', meaning: '책임이 있다' }
    ],
    difficulty: 95
  },
  {
    id: 'mistake-4',
    number: 4,
    category: 'some · among',
    notes: [
      'some + only ✗ → 복합명사',
      'among + 복수명사'
    ],
    difficulty: 80
  },
  {
    id: 'mistake-5',
    number: 5,
    category: '관사·가산',
    rules: [
      '가산 단수 → 관사 필수',
      '복수 → 관사 불필요'
    ],
    difficulty: 80
  },
  {
    id: 'mistake-6',
    number: 6,
    category: '수일치',
    rules: [
      'those + who + 복수 V',
      'anyone/everyone + who + 단수 V'
    ],
    difficulty: 95
  },
  {
    id: 'mistake-7',
    number: 7,
    category: '자·타동사 · 태',
    classifications: [
      { type: '자동사', example: 'commence' },
      { type: '타동사', examples: ['represent', 'assess', 'access'] },
      { type: '태', rule: '목적어 없이 by+행위자 → be + p.p (to부정사·원형 ✗)' }
    ],
    difficulty: 95
  }
];

export default {
  grammarUnits,
  vocabularyData,
  part5MistakesData
};
