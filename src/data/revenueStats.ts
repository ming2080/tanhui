import { CityStat, RevenueMapMetric } from '../types';

// 对应截图 image_54c4ebe8.png 中的安徽省各行政区划林业增收真实数据 (近期 2026 年)
export const CITY_STATS: CityStat[] = [
  {
    id: 'hefei',
    name: '合肥市',
    forestryIncome: 158,
    socialIncome: 126,
    forestryArea: 12500,
    socialArea: 610,
    growthRate: '+32.4%',
    color: '#2fa883',
    mapPath: 'M 225 245 L 265 235 L 295 245 L 320 270 L 315 305 L 285 330 L 255 335 L 230 310 L 220 275 Z',
    labelX: 265,
    labelY: 280,
  },
  {
    id: 'wuhu',
    name: '芜湖市',
    forestryIncome: 194,
    socialIncome: 105,
    forestryArea: 14200,
    socialArea: 520,
    growthRate: '+28.9%',
    color: '#3ec89e',
    mapPath: 'M 315 335 L 350 330 L 375 355 L 365 395 L 335 410 L 310 380 L 320 350 Z',
    labelX: 345,
    labelY: 365,
  },
  {
    id: 'bengbu',
    name: '蚌埠市',
    forestryIncome: 180,
    socialIncome: 70,
    forestryArea: 11800,
    socialArea: 360,
    growthRate: '+24.5%',
    color: '#5cdbb4',
    mapPath: 'M 255 160 L 310 150 L 335 175 L 325 210 L 280 215 L 245 195 Z',
    labelX: 290,
    labelY: 185,
  },
  {
    id: 'huainan',
    name: '淮南市',
    forestryIncome: 52,
    socialIncome: 78,
    forestryArea: 4200,
    socialArea: 280,
    growthRate: '+18.2%',
    color: '#7eebd0',
    mapPath: 'M 215 195 L 255 190 L 275 220 L 255 245 L 210 240 L 205 215 Z',
    labelX: 235,
    labelY: 220,
  },
  {
    id: 'maanshan',
    name: '马鞍山市',
    forestryIncome: 34,
    socialIncome: 62,
    forestryArea: 2800,
    socialArea: 210,
    growthRate: '+15.7%',
    color: '#7eebd0',
    mapPath: 'M 335 285 L 375 275 L 400 305 L 385 340 L 345 335 L 330 305 Z',
    labelX: 365,
    labelY: 305,
  },
  {
    id: 'huaibei',
    name: '淮北市',
    forestryIncome: 116,
    socialIncome: 96,
    forestryArea: 8900,
    socialArea: 430,
    growthRate: '+31.1%',
    color: '#3ec89e',
    mapPath: 'M 265 65 L 305 60 L 325 90 L 305 125 L 270 120 L 255 90 Z',
    labelX: 288,
    labelY: 90,
  },
  {
    id: 'tongling',
    name: '铜陵市',
    forestryIncome: 82,
    socialIncome: 70,
    forestryArea: 6100,
    socialArea: 290,
    growthRate: '+21.3%',
    color: '#5cdbb4',
    mapPath: 'M 285 345 L 315 345 L 325 380 L 295 395 L 275 375 Z',
    labelX: 300,
    labelY: 365,
  },
  {
    id: 'anqing',
    name: '安庆市',
    forestryIncome: 105,
    socialIncome: 126,
    forestryArea: 9400,
    socialArea: 590,
    growthRate: '+35.8%',
    color: '#1b6b55',
    mapPath: 'M 175 350 L 225 340 L 265 355 L 275 405 L 255 450 L 195 460 L 155 415 L 150 375 Z',
    labelX: 215,
    labelY: 400,
  },
  {
    id: 'huangshan',
    name: '黄山市',
    forestryIncome: 180,
    socialIncome: 88,
    forestryArea: 15200,
    socialArea: 460,
    growthRate: '+33.6%',
    color: '#d2fbf0',
    mapPath: 'M 285 455 L 340 445 L 385 470 L 375 530 L 330 560 L 285 535 L 270 485 Z',
    labelX: 325,
    labelY: 505,
  },
  {
    id: 'chuzhou',
    name: '滁州市',
    forestryIncome: 95,
    socialIncome: 82,
    forestryArea: 7600,
    socialArea: 380,
    growthRate: '+26.2%',
    color: '#a8f4e2',
    mapPath: 'M 305 210 L 365 200 L 415 230 L 410 280 L 350 285 L 315 250 Z',
    labelX: 365,
    labelY: 245,
  },
  {
    id: 'luan',
    name: '六安市',
    forestryIncome: 120,
    socialIncome: 92,
    forestryArea: 11000,
    socialArea: 480,
    growthRate: '+29.4%',
    color: '#d2fbf0',
    mapPath: 'M 135 240 L 210 235 L 225 295 L 210 345 L 165 350 L 125 310 L 120 265 Z',
    labelX: 168,
    labelY: 290,
  },
  {
    id: 'bozhou',
    name: '亳州市',
    forestryIncome: 88,
    socialIncome: 75,
    forestryArea: 6800,
    socialArea: 310,
    growthRate: '+22.1%',
    color: '#3ec89e',
    mapPath: 'M 185 85 L 245 75 L 260 115 L 235 155 L 180 145 L 165 110 Z',
    labelX: 215,
    labelY: 115,
  },
  {
    id: 'suzhou',
    name: '宿州市',
    forestryIncome: 102,
    socialIncome: 84,
    forestryArea: 8100,
    socialArea: 370,
    growthRate: '+25.0%',
    color: '#7eebd0',
    mapPath: 'M 295 70 L 365 65 L 385 110 L 360 160 L 310 150 L 300 110 Z',
    labelX: 340,
    labelY: 110,
  },
  {
    id: 'fuyang',
    name: '阜阳市',
    forestryIncome: 76,
    socialIncome: 68,
    forestryArea: 5900,
    socialArea: 290,
    growthRate: '+20.5%',
    color: '#d2fbf0',
    mapPath: 'M 145 155 L 215 150 L 225 195 L 195 235 L 140 225 L 125 185 Z',
    labelX: 175,
    labelY: 190,
  },
  {
    id: 'chizhou',
    name: '池州市',
    forestryIncome: 110,
    socialIncome: 95,
    forestryArea: 8600,
    socialArea: 420,
    growthRate: '+31.8%',
    color: '#268568',
    mapPath: 'M 245 405 L 285 395 L 315 425 L 295 470 L 255 460 L 240 430 Z',
    labelX: 275,
    labelY: 430,
  },
  {
    id: 'xuancheng',
    name: '宣城市',
    forestryIncome: 135,
    socialIncome: 86,
    forestryArea: 10500,
    socialArea: 440,
    growthRate: '+27.6%',
    color: '#a8f4e2',
    mapPath: 'M 345 385 L 395 365 L 435 400 L 415 465 L 365 470 L 335 425 Z',
    labelX: 385,
    labelY: 415,
  },
];

// 地图指标选项：值对应 CityStat 上的数值字段，label 与图例标题与界面下拉保持一致
export const MAP_METRIC_OPTIONS: { value: RevenueMapMetric; label: string; legendTitle: string }[] = [
  { value: 'socialIncome', label: '按社会增收金额 (万元)', legendTitle: '社会增收金额 (万元)' },
  { value: 'forestryIncome', label: '按育林增收金额 (万元)', legendTitle: '育林增收金额 (万元)' },
  { value: 'forestryArea', label: '按闲荒地面积 (亩)', legendTitle: '闲散林地育林面积 (亩)' },
];

export function metricValue(city: CityStat, metric: RevenueMapMetric): number {
  return city[metric];
}

// 汇总：四个 KPI 总数与平均环比增长率均由各市数据计算得出
export interface RevenueSummary {
  totalForestryArea: number;
  totalSocialArea: number;
  totalForestryIncome: number;
  totalSocialIncome: number;
  avgGrowthRate: number;
}

export function summarizeRevenueStats(cities: CityStat[]): RevenueSummary {
  const sum = (pick: (c: CityStat) => number) => cities.reduce((acc, c) => acc + pick(c), 0);
  const avgGrowthRate =
    cities.length === 0
      ? 0
      : cities.reduce((acc, c) => acc + (parseFloat(c.growthRate) || 0), 0) / cities.length;
  return {
    totalForestryArea: sum((c) => c.forestryArea),
    totalSocialArea: sum((c) => c.socialArea),
    totalForestryIncome: sum((c) => c.forestryIncome),
    totalSocialIncome: sum((c) => c.socialIncome),
    avgGrowthRate,
  };
}

// 分层设色：浅 → 深 8 档，按所选指标最大值等分
export const MAP_COLOR_SCALE = [
  '#d2fbf0',
  '#a8f4e2',
  '#7eebd0',
  '#5cdbb4',
  '#3ec89e',
  '#2fa883',
  '#268568',
  '#1b6b55',
];

export function colorForMetricValue(value: number, max: number): string {
  if (max <= 0) return MAP_COLOR_SCALE[0];
  const step = Math.ceil(max / MAP_COLOR_SCALE.length);
  const idx = Math.min(Math.floor(value / step), MAP_COLOR_SCALE.length - 1);
  return MAP_COLOR_SCALE[idx];
}

// 图例：与设色同一分档，最高一档只标上限
export function legendBuckets(max: number): { color: string; label: string }[] {
  const step = Math.max(1, Math.ceil(max / MAP_COLOR_SCALE.length));
  const buckets: { color: string; label: string }[] = [];
  for (let i = MAP_COLOR_SCALE.length - 1; i >= 0; i--) {
    buckets.push({
      color: MAP_COLOR_SCALE[i],
      label: i === MAP_COLOR_SCALE.length - 1 ? `${(i + 1) * step}` : `${i * step}~${(i + 1) * step}`,
    });
  }
  return buckets;
}
