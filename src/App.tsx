/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewTab, Timeframe, RiskItem, RecommendedAction } from './types';
import {
  initialKPIs,
  initialOrders,
  initialInventory,
  initialCampaigns,
  initialRisks,
  initialAutomationRules,
  initialTasks,
  initialRecommendedActions,
} from './data/mockData';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { OverviewTab } from './components/OverviewTab';
import { SalesTab } from './components/SalesTab';
import { OrdersTab } from './components/OrdersTab';
import { InventoryTab } from './components/InventoryTab';
import { MarketingTab } from './components/MarketingTab';
import { TasksAutomationTab } from './components/TasksAutomationTab';
import { RiskOpportunityTab } from './components/RiskOpportunityTab';
import { AiCopilotModal } from './components/AiCopilotModal';
import { CommandPalette } from './components/CommandPalette';
import { Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState('ecommerce');
  const [currentTab, setCurrentTab] = useState<ViewTab>('overview');
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');

  // Datasets
  const [kpis] = useState(initialKPIs);
  const [orders, setOrders] = useState(initialOrders);
  const [inventory, setInventory] = useState(initialInventory);
  const [campaigns] = useState(initialCampaigns);
  const [risks, setRisks] = useState<RiskItem[]>(initialRisks);
  const [automationRules, setAutomationRules] = useState(initialAutomationRules);
  const [tasks, setTasks] = useState(initialTasks);
  const [recommendedActions, setRecommendedActions] = useState<RecommendedAction[]>(
    initialRecommendedActions
  );

  // Modals
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const openRisksCount = risks.filter((r) => r.status === 'Open').length;

  const handleExecuteAction = (actionId: string) => {
    setRecommendedActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, executed: true } : a))
    );
  };

  const handleExecuteRiskAction = (riskId: string) => {
    setRisks((prev) =>
      prev.map((r) => (r.id === riskId ? { ...r, status: 'Resolved' } : r))
    );
  };

  const handleTriggerRestock = (sku: string) => {
    setInventory((prev) =>
      prev.map((inv) =>
        inv.sku === sku
          ? {
              ...inv,
              inStock: inv.inStock + 500,
              status: 'In Stock',
              daysOfSupply: Math.round(((inv.inStock + 500) / inv.dailyBurnRate) * 10) / 10,
            }
          : inv
      )
    );
  };

  const handleToggleRule = (ruleId: string) => {
    setAutomationRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId
          ? { ...rule, status: rule.status === 'Active' ? 'Paused' : 'Active' }
          : rule
      )
    );
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((tsk) =>
        tsk.id === taskId ? { ...tsk, completed: !tsk.completed } : tsk
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      <div>
        {/* Header Command Bar */}
        <Header
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          onOpenCopilot={() => setIsCopilotOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
          openRisksCount={openRisksCount}
        />

        {/* Navigation Tabs */}
        <NavigationTabs
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          openRisksCount={openRisksCount}
        />

        {/* Main Content Workspace */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentTab === 'overview' && (
            <OverviewTab
              kpis={kpis}
              recommendedActions={recommendedActions}
              risks={risks}
              onExecuteAction={handleExecuteAction}
              onOpenCopilot={() => setIsCopilotOpen(true)}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'sales' && <SalesTab />}

          {currentTab === 'orders' && <OrdersTab orders={orders} />}

          {currentTab === 'inventory' && (
            <InventoryTab
              inventory={inventory}
              onTriggerRestock={handleTriggerRestock}
            />
          )}

          {currentTab === 'marketing' && <MarketingTab campaigns={campaigns} />}

          {currentTab === 'automation' && (
            <TasksAutomationTab
              automationRules={automationRules}
              tasks={tasks}
              onToggleRule={handleToggleRule}
              onToggleTask={handleToggleTask}
            />
          )}

          {currentTab === 'risks_matrix' && (
            <RiskOpportunityTab
              risks={risks}
              onExecuteRiskAction={handleExecuteRiskAction}
              onOpenCopilot={() => setIsCopilotOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Footer System Status Bar */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              AXON Pilot Core Online
            </span>
            <span className="hidden md:inline text-slate-700">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Gemini AI Engine: Active
            </span>
            <span className="hidden md:inline text-slate-700">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Latency: 24ms
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">AXON Master Command Dashboard v3.2</span>
            <span className="text-slate-400 font-semibold">AI E-Commerce Industry Module</span>
          </div>
        </div>
      </footer>

      {/* AI Copilot & Command Modals */}
      <AiCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        dashboardContext={{
          netRevenue: '$162,900',
          totalOrders: 1435,
          lowStockSKUs: 5,
          openRisks: openRisksCount,
        }}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTab={setCurrentTab}
        onOpenCopilot={() => setIsCopilotOpen(true)}
      />
    </div>
  );
}
