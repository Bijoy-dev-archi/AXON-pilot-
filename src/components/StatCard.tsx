import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { KPIMetric } from '../types';

interface StatCardProps {
  metric: KPIMetric;
  onCardClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ metric, onCardClick }) => {
  return (
    <div
      onClick={onCardClick}
      className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-lg shadow-black/20"
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
          {metric.title}
        </span>
        <div className="flex items-center gap-1">
          <span
            className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${
              metric.isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {metric.isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            )}
            {metric.change}
          </span>
          <Info className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2 mt-1">
        <div className="text-2xl font-black text-slate-100 tracking-tight">
          {metric.value}
        </div>

        {/* Minimal Sparkline representation */}
        <div className="flex items-end gap-1 h-6 w-16 opacity-70 group-hover:opacity-100 transition-opacity">
          {metric.trendData.map((val, i) => {
            const min = Math.min(...metric.trendData);
            const max = Math.max(...metric.trendData);
            const heightPct = Math.max(15, Math.round(((val - min) / (max - min || 1)) * 100));
            return (
              <div
                key={i}
                style={{ height: `${heightPct}%` }}
                className={`w-1 rounded-t transition-all ${
                  metric.isPositive ? 'bg-indigo-500' : 'bg-rose-500'
                }`}
              />
            );
          })}
        </div>
      </div>

      <p className="text-[11px] font-medium text-slate-400 mt-2 line-clamp-1">
        {metric.subtext}
      </p>
    </div>
  );
};
