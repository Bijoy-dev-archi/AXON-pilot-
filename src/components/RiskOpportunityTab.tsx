import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { RiskItem } from '../types';

interface RiskOpportunityTabProps {
  risks: RiskItem[];
  onExecuteRiskAction: (id: string) => void;
  onOpenCopilot: () => void;
}

export const RiskOpportunityTab: React.FC<RiskOpportunityTabProps> = ({
  risks,
  onExecuteRiskAction,
  onOpenCopilot,
}) => {
  const [filterType, setFilterType] = useState<string>('All');

  const filtered = risks.filter(
    (r) => filterType === 'All' || r.type === filterType
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Risks, Problems & Opportunities (RPO) Intelligence Matrix</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time anomaly monitoring, financial impact evaluation, and automated mitigation
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Risk', 'Problem', 'Opportunity'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterType === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* RPO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isResolved = item.status === 'Resolved';
          return (
            <div
              key={item.id}
              className={`bg-slate-900/90 border rounded-2xl p-5 space-y-3 shadow-xl transition-all ${
                isResolved
                  ? 'border-slate-800 bg-slate-950/60 opacity-60'
                  : item.type === 'Risk'
                  ? 'border-rose-500/30 hover:border-rose-500/60'
                  : item.type === 'Problem'
                  ? 'border-amber-500/30 hover:border-amber-500/60'
                  : 'border-emerald-500/30 hover:border-emerald-500/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      item.type === 'Risk'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.type === 'Problem'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.type === 'Risk' ? (
                      <ShieldAlert className="w-3 h-3 text-rose-400" />
                    ) : item.type === 'Problem' ? (
                      <HelpCircle className="w-3 h-3 text-amber-400" />
                    ) : (
                      <Lightbulb className="w-3 h-3 text-emerald-400" />
                    )}
                    <span>{item.severity} {item.type}</span>
                  </span>
                </div>

                <span
                  className={`text-xs font-black ${
                    item.type === 'Opportunity' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.financialImpact}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-100">{item.title}</h3>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <p className="text-slate-300">
                  <span className="font-bold text-slate-400">Root Cause:</span> {item.rootCause}
                </p>
                <p className="text-slate-300">
                  <span className="font-bold text-indigo-400">Mitigation Strategy:</span>{' '}
                  {item.mitigationStrategy}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Status: <strong className="text-slate-200">{item.status}</strong>
                </span>

                {isResolved ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mitigated</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onExecuteRiskAction(item.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
