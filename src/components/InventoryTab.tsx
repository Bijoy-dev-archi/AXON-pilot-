import React, { useState } from 'react';
import {
  PackageCheck,
  AlertOctagon,
  RefreshCcw,
  Sparkles,
  CheckCircle2,
  Send,
  X,
  Boxes,
} from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryTabProps {
  inventory: InventoryItem[];
  onTriggerRestock: (sku: string) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  inventory,
  onTriggerRestock,
}) => {
  const [selectedSku, setSelectedSku] = useState<InventoryItem | null>(null);
  const [poCreated, setPoCreated] = useState(false);

  const handleGeneratePO = () => {
    setPoCreated(true);
    setTimeout(() => {
      setPoCreated(false);
      if (selectedSku) {
        onTriggerRestock(selectedSku.sku);
        setSelectedSku(null);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Inventory Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-amber-400" />
            <span>Inventory Health & Auto-Replenishment System</span>
          </h2>
          <p className="text-xs text-slate-400">
            Automated stock velocity monitoring & reorder triggers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
            Total Inventory Value: <span className="text-slate-100 font-extrabold">$248,900</span>
          </span>
        </div>
      </div>

      {/* Inventory Matrix Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">In Stock</th>
                <th className="py-3 px-4">Daily Burn</th>
                <th className="py-3 px-4">Days of Supply</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400">
                    {item.sku}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-100">{item.name}</td>
                  <td className="py-3 px-4 text-slate-400">{item.category}</td>
                  <td className="py-3 px-4 font-bold text-slate-100">
                    {item.inStock} units
                  </td>
                  <td className="py-3 px-4 text-slate-300">{item.dailyBurnRate} / day</td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-bold ${
                        item.daysOfSupply <= 3
                          ? 'text-rose-400 font-extrabold'
                          : item.daysOfSupply <= 10
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.daysOfSupply} days
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {item.supplier}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'In Stock'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : item.status === 'Out of Stock'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedSku(item)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm"
                    >
                      Auto-PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auto Purchase Order Modal */}
      {selectedSku && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedSku(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-100">
                  Generate Automated Purchase Order
                </h3>
                <p className="text-xs text-slate-400">SKU: {selectedSku.sku}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Product Name:</span>
                <span className="font-bold text-slate-100">{selectedSku.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Current Stock:</span>
                <span className="font-bold text-rose-400">{selectedSku.inStock} units ({selectedSku.daysOfSupply} days supply)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Recommended PO Size:</span>
                <span className="font-bold text-emerald-400">500 Units</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Supplier:</span>
                <span className="font-semibold text-slate-200">{selectedSku.supplier}</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-bold">
                <span>Total PO Cost (Unit $85):</span>
                <span className="text-indigo-400 text-sm">$42,500.00</span>
              </div>
            </div>

            {poCreated && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>PO #4093 generated and sent to supplier! Stock updated.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleGeneratePO}
                disabled={poCreated}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Approve & Dispatch PO</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
