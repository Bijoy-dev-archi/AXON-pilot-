import React from 'react';
import {
  Activity,
  Sparkles,
  Search,
  Bell,
  Cpu,
  ShieldAlert,
  ChevronDown,
  Layers,
  Clock,
} from 'lucide-react';
import { Timeframe } from '../types';

interface HeaderProps {
  activeModule: string;
  setActiveModule: (mod: string) => void;
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  onOpenCopilot: () => void;
  onOpenCommand: () => void;
  openRisksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  setActiveModule,
  timeframe,
  setTimeframe,
  onOpenCopilot,
  onOpenCommand,
  openRisksCount,
}) => {
  const [showModuleDropdown, setShowModuleDropdown] = React.useState(false);

  const modules = [
    { id: 'ecommerce', name: 'AI E-commerce Command Center', icon: Layers, badge: 'Primary Active' },
    { id: 'supply_chain', name: 'Global Supply Chain & Logistics', icon: Cpu, badge: 'Connected' },
    { id: 'retail', name: 'Omnichannel Physical Retail', icon: Activity, badge: 'Connected' },
  ];

  const timeframes: { id: Timeframe; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'q3_2026', label: 'Q3 2026' },
    { id: 'ytd', label: 'YTD' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Industry Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black tracking-wider text-sm">
              AX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-slate-100 text-base">
                  AXON PILOT
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 tracking-wide uppercase">
                  Master Command
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Industry Intelligence Engine
              </p>
            </div>
          </div>

          {/* Module Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowModuleDropdown(!showModuleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>{modules.find((m) => m.id === activeModule)?.name || 'AI E-commerce'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {showModuleDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                  AXON Industry Modules
                </div>
                {modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveModule(m.id);
                      setShowModuleDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left ${
                      activeModule === m.id
                        ? 'bg-indigo-600/20 text-indigo-200 font-semibold border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <m.icon className="w-4 h-4 text-indigo-400" />
                      <span>{m.name}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {m.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timeframe Selector & Actions */}
        <div className="flex items-center gap-3">
          {/* Timeframe Pill Group */}
          <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            {timeframes.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  timeframe === tf.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Quick Command Button */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search or Command</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Risk Badge Notification */}
          <div className="relative">
            <button
              onClick={onOpenCommand}
              className="p-2 text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
              title="System Alerts & Active Risks"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {openRisksCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow">
                  {openRisksCount}
                </span>
              )}
            </button>
          </div>

          {/* AI Copilot Trigger */}
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-xs shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Ask AXON AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
