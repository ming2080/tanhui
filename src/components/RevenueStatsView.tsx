import React, { useState } from 'react';
import {
  CITY_STATS,
  MAP_METRIC_OPTIONS,
  colorForMetricValue,
  legendBuckets,
  metricValue,
  summarizeRevenueStats,
} from '../data/revenueStats';
import type { CityStat, RevenueMapMetric } from '../types';
import { ChevronDown, TrendingUp, RotateCcw, LineChart, BarChart3, AlignLeft } from 'lucide-react';

// 计算三阶贝塞尔曲线平滑路径
function createSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return path;
}

// 计算平滑面积闭合路径
function createSmoothAreaPath(points: { x: number; y: number }[], baseY: number): string {
  if (points.length === 0) return '';
  const linePath = createSmoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath} L ${last.x.toFixed(1)} ${baseY} L ${first.x.toFixed(1)} ${baseY} Z`;
}




export const RevenueStatsView: React.FC = () => {
  const [districtFilter, setDistrictFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('2026');
  const [barMetric, setBarMetric] = useState<string>('按增收金额 (万元)');
  const [mapMetric, setMapMetric] = useState<RevenueMapMetric>('socialIncome');
  const [hoveredCity, setHoveredCity] = useState<CityStat | null>(null);
  const [chartStyle, setChartStyle] = useState<'area' | 'horizontal' | 'bar'>('area');

  const chartCities = CITY_STATS.slice(0, 9);

  // KPI、环比圆环、地图设色与图例均由各市数据计算得出
  const summary = summarizeRevenueStats(CITY_STATS);
  const metricMax = Math.max(...CITY_STATS.map((c) => metricValue(c, mapMetric)));
  const mapLegend = legendBuckets(metricMax);

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 左侧栏: 筛选条 + 4 KPI指标卡 + 环比卡 + 参保行政区域柱状图 */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          {/* 1. 顶部筛选条 */}
          <div className="bg-[#091126] border border-[#18284c] rounded-xl p-4 shadow-xl flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-normal text-slate-300">所属行政区划</span>
              <div className="relative min-w-[170px]">
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#101a36] border border-[#1d2d57] text-slate-100 rounded focus:outline-none focus:border-[#00c88c] cursor-pointer"
                >
                  <option value="">请选择</option>
                  {CITY_STATS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-normal text-slate-300">年份</span>
              <div className="relative min-w-[150px]">
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#101a36] border border-[#1d2d57] text-slate-100 rounded focus:outline-none focus:border-[#00c88c] cursor-pointer"
                >
                  <option value="">请选择</option>
                  <option value="2026">2026年 (近期)</option>
                  <option value="2025">2025年</option>
                  <option value="2024">2024年</option>
                </select>
              </div>
            </div>

            {districtFilter && (
              <button
                onClick={() => setDistrictFilter('')}
                className="ml-auto flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置筛选</span>
              </button>
            )}
          </div>

          {/* 2. KPI 指标统计组 (4个指标卡 + 1个环比圆环卡) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* 4个基础指标卡 (2x2 布局) */}
            <div className="sm:col-span-8 grid grid-cols-2 gap-3">
              {/* 卡片 1: 闲散林地育林面积 */}
              <div className="bg-[#091126] border border-[#18284c] rounded-xl p-3.5 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-slate-300">闲散林地育林面积</span>
                  <div
                    className="w-5 h-6 bg-[#00c88c] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%)' }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 -mt-1 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold font-mono text-[#00c88c] tracking-tight">{summary.totalForestryArea.toLocaleString()}</span>
                  <span className="text-xs text-slate-300 ml-1.5">亩</span>
                </div>
              </div>

              {/* 卡片 2: 社会增收面积 */}
              <div className="bg-[#091126] border border-[#18284c] rounded-xl p-3.5 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-slate-300">社会增收面积</span>
                  <div
                    className="w-5 h-6 bg-[#00c88c] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%)' }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 -mt-1 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold font-mono text-[#00c88c] tracking-tight">{summary.totalSocialArea.toLocaleString()}</span>
                  <span className="text-xs text-slate-300 ml-1.5">万元</span>
                </div>
              </div>

              {/* 卡片 3: 育林活动增收金额 */}
              <div className="bg-[#091126] border border-[#18284c] rounded-xl p-3.5 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-slate-300">育林活动增收金额</span>
                  <div
                    className="w-5 h-6 bg-[#00c88c] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%)' }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 -mt-1 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold font-mono text-[#00c88c] tracking-tight">{summary.totalForestryIncome.toLocaleString()}</span>
                  <span className="text-xs text-slate-300 ml-1.5">万元</span>
                </div>
              </div>

              {/* 卡片 4: 育林活动收入金额 */}
              <div className="bg-[#091126] border border-[#18284c] rounded-xl p-3.5 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-slate-300">育林活动收入金额</span>
                  <div
                    className="w-5 h-6 bg-[#00c88c] flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%)' }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 -mt-1 text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline">
                  <span className="text-2xl font-bold font-mono text-[#00c88c] tracking-tight">{summary.totalSocialIncome.toLocaleString()}</span>
                  <span className="text-xs text-slate-300 ml-1.5">万元</span>
                </div>
              </div>
            </div>

            {/* 卡片 5: 增收环比情况 */}
            <div className="sm:col-span-4 bg-[#091126] border border-[#18284c] rounded-xl p-3.5 shadow-xl flex flex-col justify-between items-center hover:border-emerald-500/40 transition-colors">
              <div className="w-full text-left">
                <span className="text-xs font-medium text-slate-300">增收环比情况</span>
              </div>

              <div className="relative w-28 h-28 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#00c88c"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - summary.avgGrowthRate / 100)}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-bold font-mono text-[#38bdf8] tracking-tight">{summary.avgGrowthRate.toFixed(2)}%</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#38bdf8] mt-0.5" />
                </div>
              </div>

              <div className="text-[11px] text-slate-400 text-center pb-0.5">
                育林增收环比去年
              </div>
            </div>
          </div>

          {/* 3. 参保行政区域统计 (支持平滑折线面积图、横向对比条形图、双柱对比图) */}
          <div className="bg-[#091126] border border-[#18284c] rounded-xl p-4 shadow-xl flex-1 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-200">参保行政区域统计</span>
                {/* 图表样式切换器 */}
                <div className="flex items-center bg-[#101a36] border border-[#1d2d57] p-0.5 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setChartStyle('area')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                      chartStyle === 'area'
                        ? 'bg-[#00c88c] text-[#091126] font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="平滑面积折线图"
                  >
                    <LineChart className="w-3 h-3" />
                    <span>平滑面积图</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartStyle('horizontal')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                      chartStyle === 'horizontal'
                        ? 'bg-[#00c88c] text-[#091126] font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="横向对比条形图"
                  >
                    <AlignLeft className="w-3 h-3" />
                    <span>横向对比条</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChartStyle('bar')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
                      chartStyle === 'bar'
                        ? 'bg-[#00c88c] text-[#091126] font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="双柱对比图"
                  >
                    <BarChart3 className="w-3 h-3" />
                    <span>柱状对比</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <select
                  value={barMetric}
                  onChange={(e) => setBarMetric(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-[#101a36] border border-[#1d2d57] text-slate-200 rounded focus:outline-none focus:border-[#00c88c] cursor-pointer"
                >
                  <option value="按增收金额 (万元)">按增收金额 (万元)</option>
                  <option value="按面积 (亩)">按面积 (亩)</option>
                </select>
              </div>
            </div>

            {/* 图例 */}
            <div className="flex items-center justify-center gap-6 mb-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-2 rounded-xs bg-[#00c88c]" />
                <span>{barMetric === '按面积 (亩)' ? '闲散林地育林面积 (亩)' : '育林活动增收金额 (万元)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-2 rounded-xs bg-[#38bdf8]" />
                <span>{barMetric === '按面积 (亩)' ? '社会增收面积 (万元)' : '社会增收金额 (万元)'}</span>
              </div>
            </div>

            {/* 图表展示区域 */}
            <div className="relative flex-1 min-h-[220px] flex flex-col justify-end pt-2 pb-1">
              {/* 样式 1: 平滑折线面积图 (默认选中的全新图表样式) */}
              {chartStyle === 'area' && (() => {
                const isArea = barMetric === '按面积 (亩)';
                const maxVal = isArea ? 16000 : 200;
                const yTicks = isArea ? [16000, 12000, 8000, 4000, 0] : [200, 150, 100, 50, 0];

                const ptsForestry = chartCities.map((c, i) => {
                  const val = isArea ? c.forestryArea : c.forestryIncome;
                  const x = 38 + i * 65;
                  const y = 165 - Math.min(Math.max((val / maxVal) * 140, 0), 140);
                  return { x, y, city: c, val };
                });

                const ptsSocial = chartCities.map((c, i) => {
                  const val = isArea ? c.socialArea * 25 : c.socialIncome; // 面积模式下展示社会效益对应量
                  const realVal = isArea ? c.socialArea : c.socialIncome;
                  const x = 38 + i * 65;
                  const y = 165 - Math.min(Math.max((val / maxVal) * 140, 0), 140);
                  return { x, y, city: c, val: realVal };
                });

                const forestryLine = createSmoothPath(ptsForestry);
                const forestryAreaPath = createSmoothAreaPath(ptsForestry, 165);
                const socialLine = createSmoothPath(ptsSocial);
                const socialAreaPath = createSmoothAreaPath(ptsSocial, 165);

                const activeCityX = hoveredCity
                  ? ptsForestry.find((p) => p.city.id === hoveredCity.id)?.x
                  : null;

                return (
                  <div className="relative w-full h-[210px] flex flex-col justify-between">
                    <svg className="w-full h-[185px] overflow-visible" viewBox="0 0 590 190">
                      <defs>
                        {/* 翡翠绿渐变 */}
                        <linearGradient id="forestryAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00c88c" stopOpacity="0.45" />
                          <stop offset="85%" stopColor="#00c88c" stopOpacity="0.05" />
                          <stop offset="100%" stopColor="#00c88c" stopOpacity="0.0" />
                        </linearGradient>

                        {/* 天蓝色渐变 */}
                        <linearGradient id="socialAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.38" />
                          <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.04" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                        </linearGradient>

                        {/* 滤镜发光 */}
                        <filter id="glowForestry" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00c88c" floodOpacity="0.6" />
                        </filter>
                        <filter id="glowSocial" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.6" />
                        </filter>
                      </defs>

                      {/* 背景网格线与 Y 轴刻度 */}
                      {yTicks.map((val, idx) => {
                        const y = 25 + idx * 35;
                        return (
                          <g key={val}>
                            <text
                              x="32"
                              y={y + 3}
                              textAnchor="end"
                              className="fill-slate-500 text-[10px] font-mono select-none"
                            >
                              {val}
                            </text>
                            <line
                              x1="36"
                              y1={y}
                              x2="570"
                              y2={y}
                              stroke="#18284c"
                              strokeDasharray={idx === 4 ? 'none' : '3 3'}
                              strokeWidth={idx === 4 ? '1.5' : '1'}
                            />
                          </g>
                        );
                      })}

                      {/* 面积填充 */}
                      <path d={forestryAreaPath} fill="url(#forestryAreaGrad)" />
                      <path d={socialAreaPath} fill="url(#socialAreaGrad)" />

                      {/* 折线 */}
                      <path
                        d={forestryLine}
                        fill="none"
                        stroke="#00c88c"
                        strokeWidth="2.5"
                        filter="url(#glowForestry)"
                      />
                      <path
                        d={socialLine}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        filter="url(#glowSocial)"
                      />

                      {/* 激活指示垂线 */}
                      {activeCityX !== undefined && activeCityX !== null && (
                        <line
                          x1={activeCityX}
                          y1="25"
                          x2={activeCityX}
                          y2="165"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          className="animate-pulse"
                        />
                      )}

                      {/* 数据节点: 育林活动 */}
                      {ptsForestry.map((pt) => {
                        const isHovered = hoveredCity?.id === pt.city.id;
                        const isFiltered = districtFilter === pt.city.name;
                        return (
                          <g
                            key={`f-${pt.city.id}`}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredCity(pt.city)}
                            onMouseLeave={() => setHoveredCity(null)}
                            onClick={() => setDistrictFilter((prev) => (prev === pt.city.name ? '' : pt.city.name))}
                          >
                            {(isHovered || isFiltered) && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="8"
                                fill="#00c88c"
                                fillOpacity="0.3"
                                className="animate-ping"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isHovered || isFiltered ? '5.5' : '3.5'}
                              fill="#091126"
                              stroke="#00c88c"
                              strokeWidth="2.5"
                            />
                          </g>
                        );
                      })}

                      {/* 数据节点: 社会增收 */}
                      {ptsSocial.map((pt) => {
                        const isHovered = hoveredCity?.id === pt.city.id;
                        const isFiltered = districtFilter === pt.city.name;
                        return (
                          <g
                            key={`s-${pt.city.id}`}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredCity(pt.city)}
                            onMouseLeave={() => setHoveredCity(null)}
                            onClick={() => setDistrictFilter((prev) => (prev === pt.city.name ? '' : pt.city.name))}
                          >
                            {(isHovered || isFiltered) && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="8"
                                fill="#38bdf8"
                                fillOpacity="0.3"
                                className="animate-ping"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isHovered || isFiltered ? '5.5' : '3.5'}
                              fill="#091126"
                              stroke="#38bdf8"
                              strokeWidth="2.5"
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* X 轴城市名称标签 */}
                    <div className="flex items-center justify-between pl-9 pr-4 text-[10px] text-slate-400 select-none">
                      {chartCities.map((c) => {
                        const isHovered = hoveredCity?.id === c.id;
                        const isFiltered = districtFilter === c.name;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            className={`transition-colors cursor-pointer hover:text-emerald-300 ${
                              isHovered || isFiltered ? 'text-[#38bdf8] font-bold scale-105' : 'text-slate-400'
                            }`}
                            onMouseEnter={() => setHoveredCity(c)}
                            onMouseLeave={() => setHoveredCity(null)}
                            onClick={() => setDistrictFilter((prev) => (prev === c.name ? '' : c.name))}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* 样式 2: 横向对比条形图 */}
              {chartStyle === 'horizontal' && (
                <div className="space-y-1.5 max-h-[210px] overflow-y-auto pr-1">
                  {chartCities.map((c, index) => {
                    const isHovered = hoveredCity?.id === c.id;
                    const isFiltered = districtFilter === c.name;
                    const maxVal = barMetric === '按面积 (亩)' ? 16000 : 200;
                    const val1 = barMetric === '按面积 (亩)' ? c.forestryArea : c.forestryIncome;
                    const val2 = barMetric === '按面积 (亩)' ? c.socialArea : c.socialIncome;
                    const pct1 = Math.min((val1 / maxVal) * 100, 100);
                    const pct2 = Math.min((val2 / (barMetric === '按面积 (亩)' ? 700 : 200)) * 100, 100);

                    return (
                      <div
                        key={c.id}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isHovered || isFiltered
                            ? 'bg-[#101a36] border-[#00c88c]/60 shadow-md'
                            : 'bg-[#0a142e]/60 border-[#18284c]/60 hover:border-[#1d2d57]'
                        }`}
                        onMouseEnter={() => setHoveredCity(c)}
                        onMouseLeave={() => setHoveredCity(null)}
                        onClick={() => setDistrictFilter((prev) => (prev === c.name ? '' : c.name))}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded text-[9px] flex items-center justify-center font-bold ${
                                index === 0
                                  ? 'bg-amber-500 text-slate-900'
                                  : index === 1
                                  ? 'bg-slate-300 text-slate-900'
                                  : index === 2
                                  ? 'bg-amber-700 text-white'
                                  : 'bg-[#18284c] text-slate-400'
                              }`}
                            >
                              {index + 1}
                            </span>
                            <span className={isHovered || isFiltered ? 'text-[#38bdf8] font-bold' : 'text-slate-200'}>
                              {c.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 font-mono text-[10px]">
                            <span className="text-[#00c88c] font-semibold">
                              育林: {val1} {barMetric === '按面积 (亩)' ? '亩' : '万'}
                            </span>
                            <span className="text-[#38bdf8] font-semibold">
                              社会: {val2} {barMetric === '按面积 (亩)' ? '万/亩' : '万'}
                            </span>
                            <span className="text-emerald-400">{c.growthRate}</span>
                          </div>
                        </div>

                        {/* 双横向进度条 */}
                        <div className="space-y-1">
                          <div className="w-full bg-[#101a36] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-[#00c88c] rounded-full transition-all duration-500"
                              style={{ width: `${pct1}%` }}
                            />
                          </div>
                          <div className="w-full bg-[#101a36] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-[#38bdf8] rounded-full transition-all duration-500"
                              style={{ width: `${pct2}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 样式 3: 柱状对比图 (经典保留) */}
              {chartStyle === 'bar' && (
                <div className="relative flex-1 min-h-[200px] flex flex-col justify-end">
                  <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-mono pr-2">
                    {[200, 150, 100, 50, 0].map((val) => (
                      <div key={val} className="flex items-center w-full">
                        <span className="w-6 text-right pr-2">{val}</span>
                        <div className="flex-1 border-b border-[#18284c]/60" />
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 flex items-end justify-between pl-8 pr-3 h-[175px]">
                    {chartCities.map((c) => {
                      const isHovered = hoveredCity?.id === c.id;
                      const isFiltered = districtFilter === c.name;
                      const forestryHeight = (c.forestryIncome / 200) * 160;
                      const socialHeight = (c.socialIncome / 200) * 160;

                      return (
                        <div
                          key={c.id}
                          className="flex-1 flex flex-col items-center group cursor-pointer transition-transform"
                          onMouseEnter={() => setHoveredCity(c)}
                          onMouseLeave={() => setHoveredCity(null)}
                          onClick={() => setDistrictFilter((prev) => (prev === c.name ? '' : c.name))}
                        >
                          <div className="flex items-end gap-1 h-[160px]">
                            <div
                              className={`w-2.5 sm:w-3.5 rounded-t-xs transition-all duration-300 ${
                                isHovered || isFiltered ? 'bg-[#00e699] shadow-lg shadow-emerald-500/50 scale-y-105' : 'bg-[#00c88c]'
                              }`}
                              style={{ height: `${forestryHeight}px` }}
                              title={`${c.name} 育林活动增收: ${c.forestryIncome}万元`}
                            />
                            <div
                              className={`w-2.5 sm:w-3.5 rounded-t-xs transition-all duration-300 ${
                                isHovered || isFiltered ? 'bg-[#99f6e4] shadow-lg shadow-teal-400/50 scale-y-105' : 'bg-[#38bdf8]'
                              }`}
                              style={{ height: `${socialHeight}px` }}
                              title={`${c.name} 社会增收: ${c.socialIncome}万元`}
                            />
                          </div>

                          <span
                            className={`text-[10px] mt-2 whitespace-nowrap transition-colors ${
                              isHovered || isFiltered ? 'text-[#38bdf8] font-bold' : 'text-slate-400'
                            }`}
                          >
                            {c.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 悬浮数据卡片 */}
              {hoveredCity && (
                <div className="absolute top-2 right-4 bg-[#0a142e] border border-[#00c88c] rounded-lg p-2.5 shadow-2xl text-[11px] text-slate-200 z-20 pointer-events-none animate-in fade-in">
                  <div className="font-bold text-white mb-1 border-b border-[#18284c] pb-1 flex justify-between gap-4">
                    <span>{hoveredCity.name}</span>
                    <span className="text-[#38bdf8]">{hoveredCity.growthRate} 环比</span>
                  </div>
                  <div className="space-y-0.5 font-mono text-[10px]">
                    <div className="flex justify-between gap-3">
                      <span className="text-[#00c88c]">育林活动增收:</span>
                      <span className="font-bold">{hoveredCity.forestryIncome} 万元</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-[#38bdf8]">社会增收金额:</span>
                      <span className="font-bold">{hoveredCity.socialIncome} 万元</span>
                    </div>
                    <div className="flex justify-between gap-3 text-slate-400">
                      <span>育林面积:</span>
                      <span>{hoveredCity.forestryArea.toLocaleString()} 亩</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧栏: 地域分布统计 (安徽省林业增收分层设色地图) */}
        <div className="lg:col-span-5 bg-[#091126] border border-[#18284c] rounded-xl p-4 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2 z-10">
            <span className="text-xs font-bold text-slate-200">地域分布统计</span>
            <div className="relative">
              <select
                value={mapMetric}
                onChange={(e) => setMapMetric(e.target.value as RevenueMapMetric)}
                className="px-2.5 py-1 text-xs bg-[#101a36] border border-[#1d2d57] text-slate-200 rounded focus:outline-none focus:border-[#00c88c] cursor-pointer"
              >
                {MAP_METRIC_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 右上角分层设色图例 */}
          <div className="absolute top-14 right-4 z-10 bg-[#0a142e]/90 backdrop-blur-xs border border-[#18284c] rounded-md p-2 text-[10px] space-y-1 shadow-md">
            <div className="text-slate-400 font-medium mb-1">
              {MAP_METRIC_OPTIONS.find((opt) => opt.value === mapMetric)?.legendTitle}
            </div>
            <div className="space-y-0.5">
              {mapLegend.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 font-mono text-[9px] text-slate-300">
                  <span className="w-3.5 h-2 rounded-2xs inline-block" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 地图矢量渲染区 */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[380px] my-2">
            <svg
              viewBox="90 40 370 530"
              className="w-full h-full max-h-[460px] filter drop-shadow-[0_10px_20px_rgba(0,200,140,0.15)]"
            >
              {CITY_STATS.map((c) => {
                const isHovered = hoveredCity?.id === c.id;
                const isSelected = districtFilter === c.name;

                return (
                  <g
                    key={c.id}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredCity(c)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => setDistrictFilter((prev) => (prev === c.name ? '' : c.name))}
                  >
                    <path
                      d={c.mapPath}
                      fill={colorForMetricValue(metricValue(c, mapMetric), metricMax)}
                      stroke={isSelected ? '#ffffff' : isHovered ? '#00e699' : '#091126'}
                      strokeWidth={isSelected ? '2.5' : isHovered ? '2' : '1'}
                      className="transition-colors hover:brightness-110"
                    />
                  </g>
                );
              })}
            </svg>

            {hoveredCity && (
              <div className="absolute bottom-4 left-4 bg-[#0a142e]/95 border border-[#00c88c] rounded-lg p-2.5 shadow-2xl text-[11px] text-slate-100 z-20 pointer-events-none animate-in fade-in">
                <div className="font-bold text-emerald-400 mb-1 border-b border-[#18284c] pb-1 flex justify-between gap-4">
                  <span>{hoveredCity.name}</span>
                  <span className="text-[#38bdf8]">{hoveredCity.growthRate} 环比</span>
                </div>
                <div className="space-y-0.5 font-mono text-[10px]">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">育林活动增收:</span>
                    <span className="font-bold text-white">{hoveredCity.forestryIncome} 万元</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">社会增收金额:</span>
                    <span className="font-bold text-[#7eead8]">{hoveredCity.socialIncome} 万元</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-400">闲散林地育林:</span>
                    <span className="font-bold text-emerald-400">{hoveredCity.forestryArea} 亩</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-[#18284c] pt-2 mt-1">
            <span>支持点击地图地块与左侧图表实时聚焦联动</span>
            <span className="text-emerald-400 font-mono">近期监测更新: 2026-10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
