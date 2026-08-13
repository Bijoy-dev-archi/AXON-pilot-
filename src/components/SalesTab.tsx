import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  PieChart as PieIcon,
  ShoppingBag,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const channelData = [
  { name: 'Meta Ads', revenue: 68400, share: '42%' },
  { name: 'Google Search', revenue: 42100, share: '26%' },
  { name: 'Direct & Organic', revenue: 29500, share: '18%' },
  { name: 'Klaviyo Email', revenue: 14800, share: '9%' },
  { name: 'Affiliates', revenue: 8100, share: '5%' },
];

const categoryData = [
  { name: 'Audio Equipment', value: 78500, color: '#6366f1' },
  { name: 'Smart Wearables', value: 44200, color: '#a855f7' },
  { name: 'Ergonomic Desk', value: 24800, color: '#38bdf8' },
  { name: 'Mobile Power', value: 15400, color: '#34d399' },
];

export const SalesTab: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState('All');

  return (
    <div className="space-y-6">
      {/* Top Sales & Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Net Revenue (MTD)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">$162,900</div>
          <div className="text-[11px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Average Order Value (AOV)</span>
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">$128.40</div>
          <div className="text-[11px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+$5.10 basket size increase</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Customer CAC vs LTV</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">$24.10 / $380</div>
          <div className="text-[11px] font-semibold text-slate-400 mt-1">
            15.7x LTV to CAC ratio
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Returning Customer Rate</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-slate-100">34.8%</div>
          <div className="text-[11px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+3.2% repeat retention</span>
          </div>
        </div>
      </div>

      {/* Sales breakdown by Category & Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Revenue Distribution Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-indigo-400" />
                <span>Product Category Revenue</span>
              </h3>
              <p className="text-xs text-slate-400">Sales share across active product lines</p>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(val: any) => [`$${val?.toLocaleString()}`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs px-2 py-1 bg-slate-950/60 rounded border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-300 font-medium">{cat.name}</span>
                </div>
                <span className="font-bold text-slate-100">${(cat.value / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Channel Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span>Sales Revenue by Channel</span>
              </h3>
              <p className="text-xs text-slate-400">Marketing attribution & channel contribution</p>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                  formatter={(val: any) => [`$${val?.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#818cf8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
