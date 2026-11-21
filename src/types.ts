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
