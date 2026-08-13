import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  ShoppingBag,
  PackageCheck,
  Megaphone,
  Zap,
  AlertOctagon,
} from 'lucide-react';
import { ViewTab } from '../types';

interface NavigationTabsProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  openRisksCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  currentTab,
  onTabChange,
  openRisksCount,
}) => {
  const tabs: { id: ViewTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales & Revenue', icon: TrendingUp },
    { id: 'orders', label: 'Orders & Deliveries', icon: ShoppingBag, badge: '42 Pending' },
    { id: 'inventory', label: 'Inventory & Stock', icon: PackageCheck, badge: '5 Low Stock' },
    { id: 'marketing', label: 'Marketing & ROAS', icon: Megaphone },
    { id: 'automation', label: 'Tasks & Automation', icon: Zap },
    {
      id: 'risks_matrix',
      label: 'Risks & Opportunities',
      icon: AlertOctagon,
      badge: openRisksCount > 0 ? `${openRisksCount} Active` : undefined,
    },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6 lg:px-8 pt-3 pb-0">
      <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-indigo-500 bg-slate-900/90 text-indigo-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    tab.id === 'risks_matrix'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : tab.id === 'inventory'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
