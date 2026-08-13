import React, { useState } from 'react';
import {
  Zap,
  CheckSquare,
  Play,
  Pause,
  Plus,
  Clock,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { AutomationRule, TaskItem } from '../types';

interface TasksAutomationTabProps {
  automationRules: AutomationRule[];
  tasks: TaskItem[];
  onToggleRule: (id: string) => void;
  onToggleTask: (id: string) => void;
}

export const TasksAutomationTab: React.FC<TasksAutomationTabProps> = ({
  automationRules,
  tasks,
  onToggleRule,
  onToggleTask,
}) => {
  return (
    <div className="space-y-6">
      {/* Automation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Autonomous Workflow Triggers & Task Command</span>
          </h2>
          <p className="text-xs text-slate-400">
            Automated operational rules, trigger conditions, and team assignments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            4 Active Workflows Online
          </span>
        </div>
      </div>

      {/* Active Workflows Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
          Automated System Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automationRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  {rule.category}
                </span>
                <button
                  onClick={() => onToggleRule(rule.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded transition-colors ${
                    rule.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {rule.status === 'Active' ? (
                    <>
                      <Pause className="w-3 h-3" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      <span>Paused</span>
                    </>
                  )}
                </button>
              </div>

              <h4 className="text-xs font-bold text-slate-100">{rule.name}</h4>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                <p className="text-slate-400">
                  <span className="font-semibold text-slate-300">IF Trigger:</span>{' '}
                  <code className="text-indigo-300 font-mono">{rule.trigger}</code>
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-slate-300">THEN Action:</span>{' '}
                  <span className="text-slate-200">{rule.action}</span>
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Total Executions: <strong className="text-slate-200">{rule.totalExecutions}</strong></span>
                <span>Last run: {rule.lastTriggered}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Queue Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-400" />
            <span>Operational Task Queue</span>
          </h3>
          <span className="text-xs text-slate-400">Assigned across AI & Operations</span>
        </div>

        <div className="space-y-2">
          {tasks.map((tsk) => (
            <div
              key={tsk.id}
              onClick={() => onToggleTask(tsk.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                tsk.completed
                  ? 'bg-slate-950/60 border-slate-800 opacity-60'
                  : 'bg-slate-800/60 border-slate-700 hover:border-indigo-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${
                    tsk.completed
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                      : 'border-slate-600 bg-slate-900'
                  }`}
                >
                  {tsk.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold ${
                      tsk.completed ? 'line-through text-slate-500' : 'text-slate-100'
                    }`}
                  >
                    {tsk.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-indigo-400">{tsk.assignedTo}</span>
                    <span>•</span>
                    <span>Due: {tsk.dueDate}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  tsk.priority === 'High'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tsk.priority} Priority
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
