import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Clock,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { KPIMetric, RiskItem, RecommendedAction } from '../types';
import { StatCard } from './StatCard';

interface OverviewTabProps {
  kpis: KPIMetric[];
  recommendedActions: RecommendedAction[];
  risks: RiskItem[];
  onExecuteAction: (id: string) => void;
  onOpenCopilot: () => void;
  onNavigateTab: (tab: any) => void;
}

const revenueData = [
  { day: 'Mon', revenue: 21400, expenses: 6200, profit: 15200 },
  { day: 'Tue', revenue: 24800, expenses: 6900, profit: 17900 },
  { day: 'Wed', revenue: 22100, expenses: 6400, profit: 15700 },
  { day: 'Thu', revenue: 28900, expenses: 7800, profit: 21100 },
  { day: 'Fri', revenue: 31200, expenses: 8400, profit: 22800 },
  { day: 'Sat', revenue: 35400, expenses: 9100, profit: 26300 },
  { day: 'Sun', revenue: 20450, expenses: 5800, profit: 14650 },
];

export const OverviewTab: React.FC<OverviewTabProps> = ({
  kpis,
  recommendedActions,
  risks,
  onExecuteAction,
  onOpenCopilot,
  onNavigateTab,
}) => {
  const [briefingRefreshing, setBriefingRefreshing] = useState(false);
  const [briefingText, setBriefingText] = useState(
    'AXON Pilot Executive Intelligence Briefing: Store velocity is strong at $162.9k Net Revenue (+18.4% YoY) with 28.6% Net Operating Margin. Primary bottleneck: AXON Pro ANC Headphones stock out in 2.3 days. Action Required: Approve air-freight PO #4092 and shift $1,500 budget to Meta Retargeting.'
  );

  const handleRefreshBriefing = async () => {
    setBriefingRefreshing(true);
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Generate a 2-sentence executive operational briefing for the e-commerce store based on current metrics.',
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setBriefingText(data.reply);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBriefingRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Daily Executive Briefing Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-5 border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                AXON Pilot AI Executive Briefing
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                Real-time Sync • Updated 2m ago
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200 leading-relaxed pt-1">
              {briefingText}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRefreshBriefing}
              disabled={briefingRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${briefingRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Briefing</span>
            </button>
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ask AI Strategist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            E-Commerce Core Performance Indicators
          </h2>
          <span className="text-xs text-slate-400">8 Real-time Metrics Tracked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <StatCard key={kpi.id} metric={kpi} />
          ))}
        </div>
      </div>

      {/* Main Interactive Charts & Urgency Action Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Operating Expenses Chart */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Weekly Revenue & Profit Margin Dynamics</span>
              </h3>
              <p className="text-xs text-slate-400">
                Gross Revenue vs Operating Expenses & Net Cashflow
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Net Profit
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(val: any) => [`$${val?.toLocaleString()}`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#34d399"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Recommended Actions Column */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Recommended Next Actions</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                AI Prioritized
              </span>
            </div>

            <div className="space-y-3">
              {recommendedActions.map((act) => (
                <div
                  key={act.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    act.executed
                      ? 'bg-slate-950/60 border-slate-800 opacity-60'
                      : 'bg-slate-800/60 border-slate-700/80 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        act.urgency === 'Immediate'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}
                    >
                      {act.urgency} Urgency
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      {act.impact}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {act.description}
                  </p>

                  <div className="mt-3">
                    {act.executed ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Action Executed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onExecuteAction(act.id)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm"
                      >
                        <span>{act.actionButtonText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('risks_matrix')}
            className="w-full text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 py-1 transition-colors"
          >
            View Full Risk & Opportunity Matrix &rarr;
          </button>
        </div>
      </div>

      {/* Snapshot of Active Risks & Problems */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Active Operational Risks & Bottlenecks</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live anomaly detection monitoring supply chain, checkout, and inventory
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('risks_matrix')}
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Open Risk Matrix Workspace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.slice(0, 2).map((risk) => (
            <div
              key={risk.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    risk.severity === 'Critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {risk.severity} {risk.type}
                </span>
                <span className="text-xs font-extrabold text-rose-400">
                  {risk.financialImpact}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-200">{risk.title}</h4>
              <p className="text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Root cause:</span> {risk.rootCause}
              </p>

              <div className="pt-1">
                <button
                  onClick={() => onNavigateTab('risks_matrix')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>{risk.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
