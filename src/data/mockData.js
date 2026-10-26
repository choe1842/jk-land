// Initial Mock Data for Stocks and Real Estate

export const INITIAL_DOMESTIC_STOCKS = [
  { id: '005930', name: '삼성전자', code: '005930', market: 'KOSPI', price: 62400, change: 1200, changePercent: 1.96, volume: '14.2M', sparkline: [61000, 61300, 60800, 61500, 62000, 62400] },
  { id: '000660', name: 'SK하이닉스', code: '000660', market: 'KOSPI', price: 198500, change: 5500, changePercent: 2.85, volume: '3.8M', sparkline: [192000, 191000, 194000, 196000, 197500, 198500] },
  { id: '373220', name: 'LG에너지솔루션', code: '373220', market: 'KOSPI', price: 395000, change: -4000, changePercent: -1.00, volume: '410K', sparkline: [402000, 401000, 398000, 399000, 394000, 395000] },
  { id: '005380', name: '현대차', code: '005380', market: 'KOSPI', price: 236000, change: 3000, changePercent: 1.29, volume: '980K', sparkline: [231000, 233000, 232000, 235000, 236000, 236000] },
  { id: '035420', name: 'NAVER', code: '035420', market: 'KOSPI', price: 178500, change: -1500, changePercent: -0.83, volume: '720K', sparkline: [181000, 180000, 179500, 179000, 178000, 178500] },
  { id: '247540', name: '에코프로비엠', code: '247540', market: 'KOSDAQ', price: 162000, change: -2400, changePercent: -1.46, volume: '620K', sparkline: [166000, 165000, 163000, 161000, 162500, 162000] },
];

export const INITIAL_US_STOCKS = [
  { id: 'NVDA', name: 'NVIDIA', code: 'NVDA', market: 'NASDAQ', price: 141.54, change: 4.22, changePercent: 3.07, volume: '48.5M', sparkline: [136, 137, 139, 138, 140, 141.54] },
  { id: 'AAPL', name: 'Apple', code: 'AAPL', market: 'NASDAQ', price: 231.41, change: 1.15, changePercent: 0.50, volume: '38.2M', sparkline: [229, 230, 228, 230, 231, 231.41] },
  { id: 'MSFT', name: 'Microsoft', code: 'MSFT', market: 'NASDAQ', price: 428.15, change: 2.80, changePercent: 0.66, volume: '21.0M', sparkline: [424, 425, 426, 424, 427, 428.15] },
  { id: 'TSLA', name: 'Tesla', code: 'TSLA', market: 'NASDAQ', price: 269.19, change: -3.85, changePercent: -1.41, volume: '65.3M', sparkline: [276, 274, 271, 270, 268, 269.19] },
  { id: 'GOOGL', name: 'Alphabet A', code: 'GOOGL', market: 'NASDAQ', price: 166.99, change: 1.84, changePercent: 1.11, volume: '19.4M', sparkline: [164, 165, 165.5, 166, 166.5, 166.99] },
  { id: 'AMZN', name: 'Amazon', code: 'AMZN', market: 'NASDAQ', price: 187.83, change: 1.45, changePercent: 0.78, volume: '24.1M', sparkline: [185, 186, 185.5, 187, 187.2, 187.83] },
];

export const INDICES = [
  { name: 'KOSPI', value: '2,612.43', change: '+28.54', percent: '+1.10%', isUp: true },
  { name: 'KOSDAQ', value: '748.21', change: '-3.12', percent: '-0.42%', isUp: false },
  { name: 'S&P 500', value: '5,864.67', change: '+24.15', percent: '+0.41%', isUp: true },
  { name: 'NASDAQ', value: '18,518.61', change: '+142.30', percent: '+0.77%', isUp: true },
  { name: 'USD/KRW', value: '1,382.50', change: '-4.00', percent: '-0.29%', isUp: false },
];

export const INITIAL_REAL_ESTATE = [
  {
    id: 1,
    name: '아크로리버파크',
    region: '서울 서초구 반포동',
    exclusiveArea: '84.97㎡ (34평)',
    recentPrice: '43억 5,000만',
    previousPrice: '42억',
    changeDiff: '+1억 5,000만',
    isUp: true,
    jeonsePrice: '20억',
    gapPrice: '23억 5,000만',
    jeonseRate: 46,
    dealDate: '2026.10.18',
    floor: '16층',
    totalHouseholds: '1,612세대',
    constructedYear: 2016,
    tags: ['대장아파트', '한강뷰', '신반포역']
  },
  {
    id: 2,
    name: '헬리오시티',
    region: '서울 송파구 가락동',
    exclusiveArea: '84.98㎡ (33평)',
    recentPrice: '22억 8,000만',
    previousPrice: '22억 3,000만',
    changeDiff: '+5,000만',
    isUp: true,
    jeonsePrice: '11억 5,000만',
    gapPrice: '11억 3,000만',
    jeonseRate: 50,
    dealDate: '2026.10.22',
    floor: '22층',
    totalHouseholds: '9,510세대',
    constructedYear: 2018,
    tags: ['국내최대단지', '송파대장', '송파역']
  },
  {
    id: 3,
    name: '마포래미안푸르지오',
    region: '서울 마포구 아현동',
    exclusiveArea: '84.89㎡ (34평)',
    recentPrice: '18억 7,000만',
    previousPrice: '18억 9,000만',
    changeDiff: '-2,000만',
    isUp: false,
    jeonsePrice: '10억 2,000만',
    gapPrice: '8억 5,000만',
    jeonseRate: 55,
    dealDate: '2026.10.15',
    floor: '12층',
    totalHouseholds: '3,885세대',
    constructedYear: 2014,
    tags: ['마용성대장', '애오개역', '직주근접']
  },
  {
    id: 4,
    name: '판교푸르지오그랑블',
    region: '경기 성남시 분당구 백현동',
    exclusiveArea: '98.54㎡ (37평)',
    recentPrice: '26억 2,000만',
    previousPrice: '25억 5,000만',
    changeDiff: '+7,000만',
    isUp: true,
    jeonsePrice: '13억 5,000만',
    gapPrice: '12억 7,000만',
    jeonseRate: 51,
    dealDate: '2026.10.20',
    floor: '18층',
    totalHouseholds: '948세대',
    constructedYear: 2011,
    tags: ['판교대장', '판교역도보', 'IT인프라']
  },
  {
    id: 5,
    name: '디에이치자이개포',
    region: '서울 강남구 일원동',
    exclusiveArea: '84.95㎡ (33평)',
    recentPrice: '31억 8,000만',
    previousPrice: '31억 2,000만',
    changeDiff: '+6,000만',
    isUp: true,
    jeonsePrice: '15억 5,000만',
    gapPrice: '16억 3,000만',
    jeonseRate: 49,
    dealDate: '2026.10.19',
    floor: '25층',
    totalHouseholds: '1,996세대',
    constructedYear: 2021,
    tags: ['강남신축', '대청역', '학군우수']
  }
];
