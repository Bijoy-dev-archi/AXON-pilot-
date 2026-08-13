import React, { useState } from 'react';
import {
  Megaphone,
  Sparkles,
  TrendingUp,
  DollarSign,
  Target,
  Copy,
  Check,
} from 'lucide-react';
import { Campaign } from '../types';

interface MarketingTabProps {
  campaigns: Campaign[];
}

export const MarketingTab: React.FC<MarketingTabProps> = ({ campaigns }) => {
  const [productName, setProductName] = useState('AXON Pro ANC Wireless Headphones');
  const [targetAudience, setTargetAudience] = useState('Remote Workers & Audiophiles');
  const [goal, setGoal] = useState('Increase Sales & ROAS');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<{
    headline: string;
    body: string;
    suggestedChannels?: string[];
    estimatedROAS?: string;
  } | null>(null);

  const handleGenerateCampaign = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/ai/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, targetAudience, goal }),
      });
      const data = await res.json();
      setGeneratedCampaign(data);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedCampaign) {
      navigator.clipboard.writeText(
        `Headline: ${generatedCampaign.headline}\n\n${generatedCampaign.body}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketing Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-purple-400" />
            <span>Omnichannel Marketing & Ad Campaign Engine</span>
          </h2>
          <p className="text-xs text-slate-400">
            Ad spend performance, attribution, and AI campaign generator
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
            Total Ad Spend: <span className="text-slate-100 font-bold">$18,400</span>
          </span>
          <span className="text-xs font-semibold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            Avg ROAS: <span className="font-extrabold">4.2x</span>
          </span>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 font-bold text-slate-200 text-sm">
          Active Ad Campaigns & ROAS Performance
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Spent</th>
                <th className="py-3 px-4">Revenue</th>
                <th className="py-3 px-4">ROAS</th>
                <th className="py-3 px-4">Conversions</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-100">{cmp.name}</td>
                  <td className="py-3 px-4 font-semibold text-indigo-400">{cmp.channel}</td>
                  <td className="py-3 px-4 text-slate-300">${cmp.budget.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-300">${cmp.spent.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">
                    ${cmp.revenueGenerated.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/20">
                      {cmp.roas}x
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{cmp.conversions}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {cmp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gemini AI Ad Copy & Campaign Creator Studio */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">
            Gemini AI Ad Copy & Campaign Generator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Target Product
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Campaign Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateCampaign}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md"
        >
          <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          <span>{generating ? 'Gemini AI Writing Campaign...' : 'Generate AI Campaign Copy'}</span>
        </button>

        {generatedCampaign && (
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3 relative mt-4">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Generated Ad Headline
              </span>
              <h4 className="text-sm font-extrabold text-slate-100 mt-0.5">
                {generatedCampaign.headline}
              </h4>
            </div>

            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Ad Primary Text
              </span>
              <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                {generatedCampaign.body}
              </p>
            </div>

            {generatedCampaign.suggestedChannels && (
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Optimal Channels:</span>
                {generatedCampaign.suggestedChannels.map((ch, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                    {ch}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
