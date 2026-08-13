import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldAlert,
  Send,
  X,
} from 'lucide-react';
import { OrderItem } from '../types';

interface OrdersTabProps {
  orders: OrderItem[];
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || ord.fulfillmentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSendUpdate = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Orders Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>Order & Fulfillment Logistics Command</span>
          </h2>
          <p className="text-xs text-slate-400">
            Track real-time orders, delivery status, and risk flags
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search order #, customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Exception">Exception</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4">Delivery ETA</th>
                <th className="py-3 px-4 text-center">Risk Score</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredOrders.map((ord) => (
                <tr
                  key={ord.id}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(ord)}
                >
                  <td className="py-3 px-4 font-bold text-indigo-400 font-mono">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-100">{ord.customerName}</div>
                    <div className="text-[10px] text-slate-400">{ord.customerEmail}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{ord.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-100">
                    ${ord.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : ord.paymentStatus === 'Pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.fulfillmentStatus === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : ord.fulfillmentStatus === 'In Transit'
                          ? 'bg-sky-500/20 text-sky-300'
                          : ord.fulfillmentStatus === 'Processing'
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : ord.fulfillmentStatus === 'Exception'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {ord.fulfillmentStatus === 'Exception' ? (
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                      ) : (
                        <Truck className="w-3 h-3" />
                      )}
                      <span>{ord.fulfillmentStatus}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{ord.deliveryEta}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ord.riskScore === 'Low'
                          ? 'text-slate-400'
                          : ord.riskScore === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {ord.riskScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(ord);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-100">
                  Order {selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-400">Placed on {selectedOrder.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Customer:</span>
                <p className="font-semibold text-slate-200">{selectedOrder.customerName}</p>
                <p className="text-slate-400">{selectedOrder.customerEmail}</p>
              </div>
              <div>
                <span className="text-slate-400">Total Value:</span>
                <p className="font-bold text-slate-100 text-sm">
                  ${selectedOrder.totalAmount.toFixed(2)}
                </p>
                <p className="text-slate-400">{selectedOrder.itemsCount} Items</p>
              </div>
              <div>
                <span className="text-slate-400">Carrier & Tracking:</span>
                <p className="font-semibold text-indigo-300">{selectedOrder.carrier}</p>
                <p className="font-mono text-[10px] text-slate-400">{selectedOrder.trackingNumber}</p>
              </div>
              <div>
                <span className="text-slate-400">Fulfillment Status:</span>
                <p className="font-bold text-emerald-400">{selectedOrder.fulfillmentStatus}</p>
                <p className="text-slate-400">ETA: {selectedOrder.deliveryEta}</p>
              </div>
            </div>

            {notificationSent && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Update notification sent to {selectedOrder.customerName}!</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleSendUpdate}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Automated Delay SMS/Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
