export type AuthMode = 'password' | 'sms' | 'qrcode' | 'ca';

export type UserRole = 'admin' | 'auditor' | 'trader' | 'regulator';

export interface UserRoleInfo {
  id: UserRole;
  name: string;
  nameEn: string;
  tag: string;
  desc: string;
}

export interface DemoAccount {
  role: UserRole;
  roleName: string;
  username: string;
  password: string;
  phone: string;
  avatar: string;
  department: string;
}

export interface CarbonProject {
  id: string;
  name: string;
  location: string;
  category: '林业碳汇' | '海洋蓝碳' | '湿地草地' | '退耕还林';
  areaHectares: number;
  annualCO2Sequestration: number; // in tonnes
  ndvIndex: number;
  status: 'active' | 'verifying' | 'trading';
  updateTime: string;
}

export interface RealtimeTelemetry {
  co2FluxPPM: number;
  totalForestBiomass: number; // 万吨
  annualReductionTons: number;
  todayIncrementalCO2: number;
  sensorCount: number;
  totalSensorCount: number; // 通量塔总数
  ndviAverage: number;
}

export interface CityStat {
  id: string;
  name: string;
  forestryIncome: number; // 育林活动增收金额 (万元)
  socialIncome: number; // 社会增收金额 (万元)
  forestryArea: number; // 闲散林地育林面积 (亩)
  socialArea: number; // 社会增收面积 (万元/亩)
  growthRate: string; // 环比增长率
  color: string; // 地图分层设色
  mapPath: string; // SVG 轮廓路径
  labelX: number;
  labelY: number;
}

export type RevenueMapMetric = 'socialIncome' | 'forestryIncome' | 'forestryArea';

export interface CarbonPriceRecord {
  id: string;
  priceNo: string;
  priceType: '市场价' | '指导价' | '挂牌价' | '协议价';
  marketSource: '全国碳市场' | '北京绿交所' | '广东碳汇市场' | 'CCER' | '海峡股权交易中心' | '四川碳交所' | '重庆碳交所';
  unitPrice: number; // 元/tCO2e
  priceDate: string;
  dataSource: '交易所API' | '人工录入' | '国家监测网';
  status: '生效中' | '已过期';
  gatherTime: string;
  isDefault?: boolean;
}

/** 碳汇质量评估单个维度的得分与等级 */
export interface QualityDimensionScore {
  score: number; // 维度得分（0–100）
  grade: string; // 维度等级（如 A+、A、A-、B+）
}

export type QualityDimensionKey =
  | 'authenticity' // 真实性
  | 'additionality' // 额外性
  | 'permanence' // 永久性
  | 'consistency' // 一致性
  | 'completeness'; // 完整性

/** 碳汇质量评估五个核心维度的得分 */
export type QualityDimensions = Record<QualityDimensionKey, QualityDimensionScore>;

/** 碳汇交易系统：企业入驻记录 */
export interface EnterpriseRecord {
  id: string;
  district: string;
  enterpriseName: string;
  address: string;
  identity: '受让' | '出让' | '受让方' | '出让方' | string;
  tradableVolume: number; // 吨
  unitPrice: number; // 元/吨
  contact: string;
  onboardingTime: string;
  licenseName?: string;
  remark?: string;
}

/** 碳汇交易系统：供应挂牌记录 */
export interface SupplyRecord {
  id: string;
  year: string;
  district: string;
  enterpriseName: string;
  supplyVolume: number;
  unitPrice: number;
  tradedVolume: number;
  onboardingTime: string;
}

/** 碳汇交易系统：需求意向记录 */
export interface DemandRecord {
  id: string;
  year: string;
  district: string;
  enterpriseName: string;
  demandVolume: number;
  unitPrice: number;
  tradedVolume: number;
  onboardingTime: string;
}

/** 碳汇交易系统：交易记录 */
export interface TradingRecord {
  id: string;
  year: string;
  supplyDistrict: string;
  supplyEnterpriseName: string;
  demandDistrict: string;
  demandEnterpriseName: string;
  tradingVolume: number;
  unitPrice: number;
  tradingTime: string;
}

/** 交易记录页签统计摘要：笔数、累计交易量、累计交易额与加权平均单价均由交易记录计算 */
export interface TradingSummary {
  tradeCount: number;
  totalVolume: number; // 吨
  totalAmount: number; // 元
  weightedAvgPrice: number; // 元/吨
}

/** 企业入驻页签统计摘要：入驻数按身份拆分，可交易总量为各企业可交易量之和 */
export interface EnterpriseSummary {
  enterpriseCount: number;
  sellerCount: number;
  buyerCount: number;
  totalTradableVolume: number; // 吨
}

/** 供应挂牌页签统计摘要：成交率为已成交量占供应总量 */
export interface SupplySummary {
  supplyCount: number;
  totalSupplyVolume: number; // 吨
  totalTradedVolume: number; // 吨
  tradeRate: number; // %
}

/** 需求意向页签统计摘要：成交率为已成交量占需求总量 */
export interface DemandSummary {
  demandCount: number;
  totalDemandVolume: number; // 吨
  totalTradedVolume: number; // 吨
  tradeRate: number; // %
}
