import {
  DemandRecord,
  DemandSummary,
  EnterpriseRecord,
  EnterpriseSummary,
  SupplyRecord,
  SupplySummary,
  TradingRecord,
  TradingSummary,
} from '../types';

export const INITIAL_ENTERPRISES: EnterpriseRecord[] = [
  { id: 'ent-1', district: '合肥市 肥西县', enterpriseName: '安徽合肥绿碳生态科技有限责任公司', address: '合肥市肥西县上派镇派河大道168号', identity: '受让', tradableVolume: 1000, unitPrice: 52, contact: '157****3283 张伟', onboardingTime: '2026-10-15 14:32:10' },
  { id: 'ent-2', district: '合肥市 肥西县', enterpriseName: '安徽省林业碳票运营管理有限公司', address: '合肥市肥西县经开区繁华大道288号', identity: '出让', tradableVolume: 8000, unitPrice: 50, contact: '138****2984 李娜', onboardingTime: '2026-10-14 11:20:05' },
  { id: 'ent-3', district: '合肥市 庐阳区', enterpriseName: '合肥庐阳区林业生态发展投资有限公司', address: '合肥市庐阳区长江中路369号', identity: '受让', tradableVolume: 1500, unitPrice: 53, contact: '139****5678 王强', onboardingTime: '2026-10-13 09:15:40' },
  { id: 'ent-4', district: '合肥市 庐阳区', enterpriseName: '安徽森碳汇源生物科技有限公司', address: '合肥市庐阳区杏花村街道天水路58号', identity: '受让', tradableVolume: 5000, unitPrice: 49, contact: '189****8765 赵敏', onboardingTime: '2026-10-12 16:45:20' },
  { id: 'ent-5', district: '合肥市 肥东县', enterpriseName: '合肥肥东生态林业开发有限公司', address: '合肥市肥东县店埠镇撮镇路12号', identity: '受让', tradableVolume: 1200, unitPrice: 51, contact: '153****3488 孙涛', onboardingTime: '2026-10-11 10:22:15' },
  { id: 'ent-6', district: '合肥市 肥东县', enterpriseName: '安徽皖中绿色碳汇资产管理中心', address: '合肥市肥东县龙泉路99号', identity: '出让', tradableVolume: 2500, unitPrice: 48, contact: '177****1122 周杰', onboardingTime: '2026-10-10 14:10:00' },
  { id: 'ent-7', district: '合肥市 高新区', enterpriseName: '合肥高新低碳技术研究院有限公司', address: '合肥市高新区创新大道118号', identity: '出让', tradableVolume: 1000, unitPrice: 55, contact: '181****6778 吴芳', onboardingTime: '2026-10-09 09:30:45' },
  { id: 'ent-8', district: '合肥市 高新区', enterpriseName: '安徽皖投碳中和数字科技有限责任公司', address: '合肥市高新区望江西路800号', identity: '出让', tradableVolume: 3500, unitPrice: 52, contact: '133****2233 郑国强', onboardingTime: '2026-10-08 15:50:30' },
  { id: 'ent-9', district: '合肥市 蜀山区', enterpriseName: '合肥蜀山绿林碳汇开发有限公司', address: '合肥市蜀山区黄山路456号', identity: '受让', tradableVolume: 2000, unitPrice: 50, contact: '150****9988 陈志远', onboardingTime: '2026-10-07 10:05:12' },
  { id: 'ent-10', district: '合肥市 滨湖新区', enterpriseName: '安徽滨湖生态湿地碳汇投资有限公司', address: '合肥市滨湖新区徽州大道5555号', identity: '出让', tradableVolume: 6000, unitPrice: 51, contact: '136****1122 刘洋', onboardingTime: '2026-10-06 08:50:00' },
];

export const INITIAL_SUPPLIES: SupplyRecord[] = [
  { id: 'sup-1', year: '2026', district: '合肥市 肥西县', enterpriseName: '安徽合肥绿碳生态科技有限责任公司', supplyVolume: 1000, unitPrice: 52, tradedVolume: 0, onboardingTime: '2026-10-15 14:32:10' },
  { id: 'sup-2', year: '2026', district: '合肥市 肥西县', enterpriseName: '安徽省林业碳票运营管理有限公司', supplyVolume: 8000, unitPrice: 50, tradedVolume: 2000, onboardingTime: '2026-10-14 11:20:05' },
  { id: 'sup-3', year: '2025', district: '合肥市 庐阳区', enterpriseName: '合肥庐阳区林业生态发展投资有限公司', supplyVolume: 1500, unitPrice: 53, tradedVolume: 500, onboardingTime: '2025-10-13 09:15:40' },
  { id: 'sup-4', year: '2025', district: '合肥市 庐阳区', enterpriseName: '安徽森碳汇源生物科技有限公司', supplyVolume: 5000, unitPrice: 49, tradedVolume: 1000, onboardingTime: '2025-09-12 16:45:20' },
  { id: 'sup-5', year: '2024', district: '合肥市 肥东县', enterpriseName: '合肥肥东生态林业开发有限公司', supplyVolume: 1200, unitPrice: 51, tradedVolume: 1200, onboardingTime: '2024-10-11 10:22:15' },
  { id: 'sup-6', year: '2024', district: '合肥市 肥东县', enterpriseName: '安徽皖中绿色碳汇资产管理中心', supplyVolume: 2500, unitPrice: 48, tradedVolume: 2000, onboardingTime: '2024-08-10 14:10:00' },
  { id: 'sup-7', year: '2023', district: '合肥市 高新区', enterpriseName: '合肥高新低碳技术研究院有限公司', supplyVolume: 1000, unitPrice: 55, tradedVolume: 1000, onboardingTime: '2023-11-09 09:30:45' },
  { id: 'sup-8', year: '2023', district: '合肥市 高新区', enterpriseName: '安徽碳中和数字科技有限责任公司', supplyVolume: 3500, unitPrice: 52, tradedVolume: 1000, onboardingTime: '2023-10-08 15:50:30' },
  { id: 'sup-9', year: '2023', district: '合肥市 蜀山区', enterpriseName: '合肥蜀山绿林碳汇开发有限公司', supplyVolume: 2000, unitPrice: 50, tradedVolume: 500, onboardingTime: '2023-07-07 10:05:12' },
  { id: 'sup-10', year: '2023', district: '合肥市 滨湖新区', enterpriseName: '安徽滨湖生态湿地碳汇投资有限公司', supplyVolume: 6000, unitPrice: 51, tradedVolume: 3000, onboardingTime: '2023-05-06 08:50:00' },
];

export const INITIAL_DEMANDS: DemandRecord[] = [
  { id: 'dem-1', year: '2026', district: '合肥市 肥西县', enterpriseName: '安徽合肥绿碳生态科技有限责任公司', demandVolume: 1000, unitPrice: 52, tradedVolume: 0, onboardingTime: '2026-10-15 14:32:10' },
  { id: 'dem-2', year: '2026', district: '合肥市 肥西县', enterpriseName: '安徽省林业碳票运营管理有限公司', demandVolume: 8000, unitPrice: 50, tradedVolume: 2000, onboardingTime: '2026-10-14 11:20:05' },
  { id: 'dem-3', year: '2025', district: '合肥市 庐阳区', enterpriseName: '合肥庐阳区林业生态发展投资有限公司', demandVolume: 1500, unitPrice: 53, tradedVolume: 500, onboardingTime: '2025-10-13 09:15:40' },
  { id: 'dem-4', year: '2025', district: '合肥市 庐阳区', enterpriseName: '安徽森碳汇源生物科技有限公司', demandVolume: 5000, unitPrice: 49, tradedVolume: 1000, onboardingTime: '2025-09-12 16:45:20' },
  { id: 'dem-5', year: '2024', district: '合肥市 肥东县', enterpriseName: '安徽肥东生态林业开发有限公司', demandVolume: 1200, unitPrice: 51, tradedVolume: 1200, onboardingTime: '2024-10-11 10:22:15' },
  { id: 'dem-6', year: '2024', district: '合肥市 肥东县', enterpriseName: '安徽皖中绿色碳汇资产管理中心', demandVolume: 2500, unitPrice: 48, tradedVolume: 2000, onboardingTime: '2024-08-10 14:10:00' },
  { id: 'dem-7', year: '2023', district: '合肥市 高新区', enterpriseName: '合肥高新低碳技术研究院有限公司', demandVolume: 1000, unitPrice: 55, tradedVolume: 1000, onboardingTime: '2023-11-09 09:30:45' },
  { id: 'dem-8', year: '2023', district: '合肥市 高新区', enterpriseName: '安徽碳中和数字科技有限责任公司', demandVolume: 3500, unitPrice: 52, tradedVolume: 1000, onboardingTime: '2023-10-08 15:50:30' },
  { id: 'dem-9', year: '2023', district: '合肥市 蜀山区', enterpriseName: '合肥蜀山绿林碳汇开发有限公司', demandVolume: 2000, unitPrice: 50, tradedVolume: 500, onboardingTime: '2023-07-07 10:05:12' },
  { id: 'dem-10', year: '2023', district: '合肥市 滨湖新区', enterpriseName: '安徽滨湖生态湿地碳汇投资有限公司', demandVolume: 6000, unitPrice: 51, tradedVolume: 3000, onboardingTime: '2023-05-06 08:50:00' },
];

export const INITIAL_TRADING_RECORDS: TradingRecord[] = [
  { id: 'tr-1', year: '2026', supplyDistrict: '合肥市 肥西县', supplyEnterpriseName: '安徽合肥绿碳生态科技有限责任公司', demandDistrict: '合肥市 肥东县', demandEnterpriseName: '安徽省林业碳票运营管理有限公司', tradingVolume: 1500, unitPrice: 52, tradingTime: '2026-10-18 16:45:20' },
  { id: 'tr-2', year: '2026', supplyDistrict: '合肥市 庐阳区', supplyEnterpriseName: '合肥庐阳区林业生态发展投资有限公司', demandDistrict: '合肥市 高新区', demandEnterpriseName: '安徽高新低碳技术研究院有限公司', tradingVolume: 2200, unitPrice: 54, tradingTime: '2026-10-17 14:30:10' },
  { id: 'tr-3', year: '2026', supplyDistrict: '合肥市 肥东县', supplyEnterpriseName: '安徽肥东生态林业开发有限公司', demandDistrict: '合肥市 蜀山区', demandEnterpriseName: '安徽蜀山绿林碳汇开发有限公司', tradingVolume: 3000, unitPrice: 51, tradingTime: '2026-10-16 11:20:05' },
  { id: 'tr-4', year: '2026', supplyDistrict: '合肥市 高新区', supplyEnterpriseName: '安徽皖投碳中和数字科技有限责任公司', demandDistrict: '合肥市 滨湖新区', demandEnterpriseName: '安徽滨湖生态湿地碳汇投资有限公司', tradingVolume: 5000, unitPrice: 53, tradingTime: '2026-10-15 09:15:40' },
  { id: 'tr-5', year: '2026', supplyDistrict: '合肥市 蜀山区', supplyEnterpriseName: '安徽蜀山绿林碳汇开发有限公司', demandDistrict: '合肥市 肥西县', demandEnterpriseName: '安徽合肥绿碳生态科技有限责任公司', tradingVolume: 1200, unitPrice: 49, tradingTime: '2026-10-14 15:10:00' },
  { id: 'tr-6', year: '2026', supplyDistrict: '合肥市 滨湖新区', supplyEnterpriseName: '安徽滨湖生态湿地碳汇投资有限公司', demandDistrict: '合肥市 庐阳区', demandEnterpriseName: '安徽森碳汇源生物科技有限公司', tradingVolume: 4000, unitPrice: 55, tradingTime: '2026-10-12 10:22:15' },
  { id: 'tr-7', year: '2026', supplyDistrict: '合肥市 肥西县', supplyEnterpriseName: '安徽省林业碳票运营管理有限公司', demandDistrict: '合肥市 肥东县', demandEnterpriseName: '安徽皖中绿色碳汇资产管理中心', tradingVolume: 2500, unitPrice: 50, tradingTime: '2026-10-10 14:10:00' },
  { id: 'tr-8', year: '2026', supplyDistrict: '合肥市 庐阳区', supplyEnterpriseName: '安徽森碳汇源生物科技有限公司', demandDistrict: '合肥市 高新区', demandEnterpriseName: '安徽高新低碳技术研究院有限公司', tradingVolume: 1800, unitPrice: 48, tradingTime: '2026-10-08 09:30:45' },
  { id: 'tr-9', year: '2026', supplyDistrict: '合肥市 肥东县', supplyEnterpriseName: '安徽皖中绿色碳汇资产管理中心', demandDistrict: '合肥市 蜀山区', demandEnterpriseName: '安徽合肥绿碳生态科技有限责任公司', tradingVolume: 3200, unitPrice: 52, tradingTime: '2026-10-05 15:50:30' },
  { id: 'tr-10', year: '2026', supplyDistrict: '合肥市 高新区', supplyEnterpriseName: '安徽高新低碳技术研究院有限公司', demandDistrict: '合肥市 滨湖新区', demandEnterpriseName: '安徽省林业碳票运营管理有限公司', tradingVolume: 6000, unitPrice: 56, tradingTime: '2026-10-01 08:50:00' },
];

/** 交易记录统计摘要：累计交易额按每笔交易量×单价汇总，加权均价为交易额除以交易量 */
export function calcTradingSummary(records: TradingRecord[]): TradingSummary {
  const tradeCount = records.length;
  const totalVolume = records.reduce((sum, r) => sum + r.tradingVolume, 0);
  const totalAmount = records.reduce((sum, r) => sum + r.tradingVolume * r.unitPrice, 0);
  const weightedAvgPrice = totalVolume > 0 ? totalAmount / totalVolume : 0;
  return { tradeCount, totalVolume, totalAmount, weightedAvgPrice };
}

/** 企业入驻统计摘要：身份含“出让”计出让方，含“受让”计受让方 */
export function calcEnterpriseSummary(records: EnterpriseRecord[]): EnterpriseSummary {
  const enterpriseCount = records.length;
  const sellerCount = records.filter((r) => r.identity.includes('出让')).length;
  const buyerCount = records.filter((r) => r.identity.includes('受让')).length;
  const totalTradableVolume = records.reduce((sum, r) => sum + r.tradableVolume, 0);
  return { enterpriseCount, sellerCount, buyerCount, totalTradableVolume };
}

/** 供应挂牌统计摘要：成交率为已成交量占供应总量的百分比 */
export function calcSupplySummary(records: SupplyRecord[]): SupplySummary {
  const supplyCount = records.length;
  const totalSupplyVolume = records.reduce((sum, r) => sum + r.supplyVolume, 0);
  const totalTradedVolume = records.reduce((sum, r) => sum + r.tradedVolume, 0);
  const tradeRate = totalSupplyVolume > 0 ? (totalTradedVolume / totalSupplyVolume) * 100 : 0;
  return { supplyCount, totalSupplyVolume, totalTradedVolume, tradeRate };
}

/** 需求意向统计摘要：成交率为已成交量占需求总量的百分比 */
export function calcDemandSummary(records: DemandRecord[]): DemandSummary {
  const demandCount = records.length;
  const totalDemandVolume = records.reduce((sum, r) => sum + r.demandVolume, 0);
  const totalTradedVolume = records.reduce((sum, r) => sum + r.tradedVolume, 0);
  const tradeRate = totalDemandVolume > 0 ? (totalTradedVolume / totalDemandVolume) * 100 : 0;
  return { demandCount, totalDemandVolume, totalTradedVolume, tradeRate };
}
