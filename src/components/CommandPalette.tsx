import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  LayoutDashboard,
  TrendingUp,
  ShoppingBag,
  PackageCheck,
  Megaphone,
  Zap,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';
import { ViewTab } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: ViewTab) => void;
  onOpenCopilot: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenCopilot,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'nav-overview',
      title: 'Go to Executive Overview',
      type: 'Navigation',
      icon: LayoutDashboard,
      action: () => {
        onSelectTab('overview');
        onClose();
      },
    },
    {
      id: 'nav-sales',
      title: 'Go to Sales & Revenue Analytics',
      type: 'Navigation',
      icon: TrendingUp,
      action: () => {
        onSelectTab('sales');
        onClose();
      },
    },
    {
      id: 'nav-orders',
      title: 'Go to Orders & Delivery Logistics',
      type: 'Navigation',
      icon: ShoppingBag,
      action: () => {
        onSelectTab('orders');
        onClose();
      },
    },
    {
      id: 'nav-inventory',
      title: 'Go to Inventory & Stock Monitor',
      type: 'Navigation',
      icon: PackageCheck,
      action: () => {
        onSelectTab('inventory');
        onClose();
      },
    },
    {
      id: 'nav-marketing',
      title: 'Go to Marketing & Campaign Engine',
      type: 'Navigation',
      icon: Megaphone,
      action: () => {
        onSelectTab('marketing');
        onClose();
      },
    },
    {
      id: 'nav-automation',
      title: 'Go to Tasks & Workflow Automations',
      type: 'Navigation',
      icon: Zap,
      action: () => {
        onSelectTab('automation');
        onClose();
      },
    },
    {
      id: 'nav-risks',
      title: 'Go to Risk, Problem & Opportunity Matrix',
      type: 'Navigation',
      icon: AlertOctagon,
      action: () => {
        onSelectTab('risks_matrix');
        onClose();
      },
    },
    {
      id: 'act-ai',
      title: 'Launch AXON AI Pilot Copilot Assistant',
      type: 'AI Action',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenCopilot();
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl space-y-0">
        <div className="p-3 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:bg-indigo-600/20 hover:text-indigo-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{cmd.title}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  {cmd.type}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          )}
        </div>

        <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>
            Use <kbd className="px-1 py-0.5 bg-slate-800 rounded">↑</kbd>{' '}
            <kbd className="px-1 py-0.5 bg-slate-800 rounded">↓</kbd> to navigate
          </span>
          <span>
            Press <kbd className="px-1 py-0.5 bg-slate-800 rounded">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
