export const ALL_STOCKS = [
  // --- KOREA KOSPI / KOSDAQ ---
  {
    code: '005930',
    name: '삼성전자',
    enName: 'Samsung Electronics',
    market: 'KOSPI',
    price: 62400,
    change: 1200,
    changePercent: 1.96,
    volume: '14.8M',
    marketCap: '372조 5,140억',
    per: 12.8,
    pbr: 1.15,
    dividendYield: '2.45%',
    high52: 88800,
    low52: 58500,
    foreignRate: '53.4%',
    sector: '반도체 / IT',
    aiInsight: 'HBM3E 엔비디아 납품 테스트 통과 기대감 및 파운드리 수율 개선이 주가 반등의 핵심 모멘텀입니다. PBR 1.15배는 역사적 밸류에이션 바닥 구간입니다.',
    chart: [60500, 61000, 60800, 61500, 62000, 62400],
    financials: [
      { year: '2023', revenue: '258조 9,350억', opProfit: '6조 5,670억', netProfit: '15조 4,870억', roe: '4.1%', debtRatio: '25.3%' },
      { year: '2024(E)', revenue: '305조 2,000억', opProfit: '35조 8,000억', netProfit: '32조 1,000억', roe: '9.8%', debtRatio: '24.1%' },
      { year: '2025(E)', revenue: '335조 4,000억', opProfit: '48조 2,000억', netProfit: '42조 5,000억', roe: '12.4%', debtRatio: '22.8%' }
    ],
    news: [
      { title: '삼성전자 HBM3E 12단 납품 본격화 조짐... 파운드리 반등 기대', time: '1시간 전', press: '한국경제' },
      { title: '외국인 순매수 전환... "삼성전자 밸류에이션 저점 확인"', time: '3시간 전', press: '매일경제' }
    ]
  },
  {
    code: '000660',
    name: 'SK하이닉스',
    enName: 'SK Hynix',
    market: 'KOSPI',
    price: 198500,
    change: 5500,
    changePercent: 2.85,
    volume: '4.2M',
    marketCap: '144조 5,080억',
    per: 8.4,
    pbr: 1.82,
    dividendYield: '1.10%',
    high52: 248500,
    low52: 114000,
    foreignRate: '54.2%',
    sector: '반도체 / AI 메모리',
    aiInsight: 'HBM3 및 HBM3E 글로벌 시장 점유율 1위 독주 중. 빅테크 AI 데이터센터 향 HBM 공급 계약이 2026년까지 선확보된 상태입니다.',
    chart: [189000, 192000, 191500, 194000, 196000, 198500],
    financials: [
      { year: '2023', revenue: '32조 7,660억', opProfit: '-7조 7,300억', netProfit: '-9조 1,380억', roe: '-15.6%', debtRatio: '87.2%' },
      { year: '2024(E)', revenue: '66조 1,000억', opProfit: '23조 4,000억', netProfit: '19조 2,000억', roe: '28.5%', debtRatio: '45.1%' },
      { year: '2025(E)', revenue: '79조 5,000억', opProfit: '30조 8,000억', netProfit: '25조 1,000억', roe: '26.8%', debtRatio: '32.4%' }
    ],
    news: [
      { title: 'SK하이닉스 3분기 사상 최대 영업이익 달성... HBM 매출 비중 40% 돌파', time: '2시간 전', press: '조선비즈' },
      { title: '골드만삭스 "SK하이닉스 목표주가 26만원 상향 유지"', time: '5시간 전', press: '연합뉴스' }
    ]
  },
  {
    code: '373220',
    name: 'LG에너지솔루션',
    enName: 'LG Energy Solution',
    market: 'KOSPI',
    price: 395000,
    change: -4000,
    changePercent: -1.00,
    volume: '380K',
    marketCap: '92조 4,300억',
    per: 78.5,
    pbr: 4.2,
    dividendYield: '0.00%',
    high52: 485000,
    low52: 310000,
    foreignRate: '4.8%',
    sector: '2차전지 / 배터리',
    aiInsight: '전기차 일시적 캐즘 국면에도 포드, 벤츠 향 수주 잔고 300조원 돌파. ESS 사업 부문이 신성장 동력으로 부상 중.',
    chart: [405000, 401000, 398000, 399000, 394000, 395000],
    financials: [
      { year: '2023', revenue: '33조 7,450억', opProfit: '2조 1,630억', netProfit: '1조 6,380억', roe: '8.2%', debtRatio: '68.5%' },
      { year: '2024(E)', revenue: '28조 2,000억', opProfit: '1조 4,500억', netProfit: '9,800억', roe: '4.5%', debtRatio: '65.2%' },
      { year: '2025(E)', revenue: '35조 1,000억', opProfit: '2조 8,000억', netProfit: '2조 1,000억', roe: '8.8%', debtRatio: '59.0%' }
    ],
    news: [
      { title: 'LG엔솔, 벤츠와 대규모 원통형 배터리 50GWh 공급 계약 체결', time: '4시간 전', press: '머니투데이' }
    ]
  },
  {
    code: '005380',
    name: '현대차',
    enName: 'Hyundai Motor',
    market: 'KOSPI',
    price: 236000,
    change: 3000,
    changePercent: 1.29,
    volume: '950K',
    marketCap: '49조 8,200억',
    per: 5.6,
    pbr: 0.65,
    dividendYield: '5.20%',
    high52: 298000,
    low52: 172000,
    foreignRate: '38.6%',
    sector: '자동차',
    aiInsight: '인도법인(HMI) 역대 최대 규모 IPO 상장 성공. 하이브리드 판매 비중 급증 및 주주환원 배당수익률 5%대 매력.',
    chart: [230000, 233000, 232000, 235000, 236000, 236000],
    financials: [
      { year: '2023', revenue: '162조 6,630억', opProfit: '15조 1,260억', netProfit: '12조 2,720억', roe: '16.5%', debtRatio: '172.4%' },
      { year: '2024(E)', revenue: '172조 5,000억', opProfit: '16조 2,000억', netProfit: '13조 5,000억', roe: '15.8%', debtRatio: '165.0%' },
      { year: '2025(E)', revenue: '181조 8,000억', opProfit: '17조 1,000억', netProfit: '14조 2,000억', roe: '14.9%', debtRatio: '158.2%' }
    ],
    news: [
      { title: '현대차 인도 상장 첫날 시총 30조 안착... 글로벌 생산 기지 가속', time: '1일 전', press: '이데일리' }
    ]
  },
  {
    code: '196170',
    name: '알테오젠',
    enName: 'Alteogen',
    market: 'KOSDAQ',
    price: 378500,
    change: 14500,
    changePercent: 3.98,
    volume: '620K',
    marketCap: '20조 1,300억',
    per: 95.0,
    pbr: 18.5,
    dividendYield: '0.00%',
    high52: 410000,
    low52: 67000,
    foreignRate: '14.8%',
    sector: '바이오 플랫폼',
    aiInsight: '머크(MSD) 키트루다SC 글로벌 임상 3상 완료. 2026년부터 연간 1조원 이상의 로열티 유입 예상.',
    chart: [355000, 360000, 368000, 364000, 372000, 378500],
    financials: [
      { year: '2023', revenue: '965억', opProfit: '-44억', netProfit: '-28억', roe: '-1.5%', debtRatio: '32.1%' },
      { year: '2024(E)', revenue: '1,850억', opProfit: '920억', netProfit: '850억', roe: '24.2%', debtRatio: '24.5%' },
      { year: '2025(E)', revenue: '4,200억', opProfit: '2,800억', netProfit: '2,500억', roe: '45.0%', debtRatio: '18.2%' }
    ],
    news: [
      { title: '알테오젠, 코스닥 시총 1위 등극... 키트루다SC 독점 지위 유지', time: '2시간 전', press: '바이오스펙테이터' }
    ]
  },
  {
    code: '012450',
    name: '한화에어로스페이스',
    enName: 'Hanwha Aerospace',
    market: 'KOSPI',
    price: 368000,
    change: 8000,
    changePercent: 2.22,
    volume: '480K',
    marketCap: '18조 6,200억',
    per: 18.2,
    pbr: 3.1,
    dividendYield: '0.80%',
    high52: 395000,
    low52: 102000,
    foreignRate: '34.5%',
    sector: 'K-방산 / 항공우주',
    aiInsight: '폴란드, 루마니아 향 K9 자주포 및 천무 다련장 로켓 수주 잔고 30조 돌파. 유럽 군비 증강 최대 수혜주.',
    chart: [350000, 355000, 358000, 362000, 365000, 368000],
    financials: [
      { year: '2023', revenue: '9조 3,600억', opProfit: '7,050억', netProfit: '6,400억', roe: '14.8%', debtRatio: '245.2%' },
      { year: '2024(E)', revenue: '11조 2,000억', opProfit: '1조 1,500억', netProfit: '9,800억', roe: '18.2%', debtRatio: '210.5%' },
      { year: '2025(E)', revenue: '13조 8,000억', opProfit: '1조 5,200억', netProfit: '1조 3,000억', roe: '21.0%', debtRatio: '185.0%' }
    ],
    news: [
      { title: '한화에어로스페이스 루마니아 K9 납품 계약 순항... 연내 추가 수주 기대', time: '3시간 전', press: '아시아경제' }
    ]
  },

  // --- US NASDAQ / S&P 500 ---
  {
    code: 'NVDA',
    name: '엔비디아',
    enName: 'NVIDIA Corp',
    market: 'NASDAQ',
    price: 141.54,
    change: 4.22,
    changePercent: 3.07,
    volume: '52.1M',
    marketCap: '$3.47T',
    per: 54.2,
    pbr: 48.5,
    dividendYield: '0.03%',
    high52: 144.42,
    low52: 39.23,
    foreignRate: 'Global',
    sector: 'AI 반도체 / 가속기',
    aiInsight: '차세대 블랙웰(Blackwell) B200 칩의 12개월 치 예약 물량 완판. 글로벌 빅테크 자본지출(Capex) 확대로 실적 서프라이즈 지속.',
    chart: [135, 137, 139, 138, 140, 141.54],
    financials: [
      { year: 'FY2023', revenue: '$27.0B', opProfit: '$4.2B', netProfit: '$4.4B', roe: '19.8%', debtRatio: '45.2%' },
      { year: 'FY2024', revenue: '$60.9B', opProfit: '$33.0B', netProfit: '$29.8B', roe: '91.5%', debtRatio: '32.1%' },
      { year: 'FY2025(E)', revenue: '$125.0B', opProfit: '$78.0B', netProfit: '$69.5B', roe: '105.0%', debtRatio: '25.0%' }
    ],
    news: [
      { title: '젠슨 황 "블랙웰 칩 수요 미쳤다... 공급이 따라가지 못할 지경"', time: '30분 전', press: 'CNBC' },
      { title: '엔비디아, 애플 제치고 세계 시가총액 1위 등극 눈앞', time: '1시간 전', press: 'Wall Street Journal' }
    ]
  },
  {
    code: 'AAPL',
    name: '애플',
    enName: 'Apple Inc',
    market: 'NASDAQ',
    price: 231.41,
    change: 1.15,
    changePercent: 0.50,
    volume: '41.3M',
    marketCap: '$3.52T',
    per: 33.8,
    pbr: 45.2,
    dividendYield: '0.43%',
    high52: 237.23,
    low52: 164.08,
    foreignRate: 'Global',
    sector: '빅테크 / 스마트폰 / AI',
    aiInsight: 'Apple Intelligence iOS 18.1 배포로 아이폰 교체 수요 본격화. 강력한 서비스 부문 마진(70%+)으로 현금 흐름 견고.',
    chart: [228, 230, 229, 230, 231, 231.41],
    financials: [
      { year: 'FY2023', revenue: '$383.3B', opProfit: '$114.3B', netProfit: '$97.0B', roe: '156.1%', debtRatio: '145.8%' },
      { year: 'FY2024(E)', revenue: '$395.5B', opProfit: '$122.0B', netProfit: '$104.2B', roe: '162.0%', debtRatio: '138.2%' },
      { year: 'FY2025(E)', revenue: '$425.0B', opProfit: '$135.5B', netProfit: '$115.0B', roe: '170.5%', debtRatio: '125.0%' }
    ],
    news: [
      { title: '애플 인텔리전스 한국어 지원 로드맵 2025년 상반기 확정', time: '3시간 전', press: 'TechCrunch' }
    ]
  },
  {
    code: 'TSLA',
    name: '테슬라',
    enName: 'Tesla Inc',
    market: 'NASDAQ',
    price: 269.19,
    change: -3.85,
    changePercent: -1.41,
    volume: '71.5M',
    marketCap: '$858B',
    per: 72.4,
    pbr: 12.1,
    dividendYield: '0.00%',
    high52: 273.54,
    low52: 138.80,
    foreignRate: 'Global',
    sector: '전기차 / 자율주행 / 로봇',
    aiInsight: '사이버캡(Cybercab) 로보택시 공개 이후 FSD 기술 가치 재평가. 메가팩(에너지 저장장치) 사업부의 분기 영업이익률 급상승.',
    chart: [275, 274, 271, 270, 268, 269.19],
    financials: [
      { year: '2023', revenue: '$96.8B', opProfit: '$8.9B', netProfit: '$15.0B', roe: '27.9%', debtRatio: '18.5%' },
      { year: '2024(E)', revenue: '$102.5B', opProfit: '$9.5B', netProfit: '$9.8B', roe: '15.2%', debtRatio: '16.0%' },
      { year: '2025(E)', revenue: '$124.0B', opProfit: '$14.2B', netProfit: '$13.5B', roe: '18.8%', debtRatio: '14.2%' }
    ],
    news: [
      { title: '일론 머스크 "2025년 캘리포니아·텍사스에서 무인 로보택시 서비스 시작"', time: '2시간 전', press: 'Bloomberg' }
    ]
  },
  {
    code: 'PLTR',
    name: '팔란티어',
    enName: 'Palantir Technologies',
    market: 'NYSE',
    price: 44.86,
    change: 1.95,
    changePercent: 4.54,
    volume: '58.0M',
    marketCap: '$101B',
    per: 115.0,
    pbr: 24.2,
    dividendYield: '0.00%',
    high52: 45.48,
    low52: 14.48,
    foreignRate: 'Global',
    sector: '빅데이터 / 엔터프라이즈 AI',
    aiInsight: 'S&P 500 편입 완료. 정부 기관(국방부, CIA) 및 상업용 AIP(인공지능 플랫폼) 도입 고객 수 전년 대비 83% 폭증.',
    chart: [41, 42, 42.8, 43.5, 44, 44.86],
    financials: [
      { year: '2023', revenue: '$2.23B', opProfit: '$120M', netProfit: '$210M', roe: '6.5%', debtRatio: '15.2%' },
      { year: '2024(E)', revenue: '$2.85B', opProfit: '$580M', netProfit: '$510M', roe: '14.2%', debtRatio: '12.0%' },
      { year: '2025(E)', revenue: '$3.70B', opProfit: '$950M', netProfit: '$840M', roe: '19.5%', debtRatio: '10.5%' }
    ],
    news: [
      { title: '팔란티어, 미 육군과 5억 달러 규모 AI 전장 데이터 분석 계약 체결', time: '1일 전', press: 'Reuters' }
    ]
  }
];
