export type ViewTab =
  | 'overview'
  | 'sales'
  | 'orders'
  | 'inventory'
  | 'marketing'
  | 'automation'
  | 'risks_matrix';

export type Timeframe = 'today' | '7d' | '30d' | 'q3_2026' | 'ytd';

export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  subtext: string;
  category: 'financial' | 'operations' | 'marketing' | 'customers';
  trendData: number[];
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
  fulfillmentStatus: 'Processing' | 'In Transit' | 'Delivered' | 'On Hold' | 'Exception';
  deliveryEta: string;
  carrier: string;
  trackingNumber: string;
  riskScore: 'Low' | 'Medium' | 'High';
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  inStock: number;
  reorderPoint: number;
  unitCost: number;
  sellingPrice: number;
  dailyBurnRate: number;
  daysOfSupply: number;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
}

export interface Campaign {
  id: string;
  name: string;
  channel: 'Meta Ads' | 'Google Search' | 'TikTok' | 'Klaviyo Email' | 'Affiliate';
  status: 'Active' | 'Paused' | 'Completed';
  budget: number;
  spent: number;
  revenueGenerated: number;
  roas: number;
  clicks: number;
  conversions: number;
}

export interface RiskItem {
  id: string;
  title: string;
  type: 'Risk' | 'Problem' | 'Opportunity';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  financialImpact: string;
  rootCause: string;
  mitigationStrategy: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  automatedActionAvailable: boolean;
  actionText: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  lastTriggered: string;
  totalExecutions: number;
  category: 'Inventory' | 'Fulfillment' | 'Marketing' | 'Customer Support';
}

export interface TaskItem {
  id: string;
  title: string;
  assignedTo: 'AI Copilot' | 'Operations Team' | 'Logistics' | 'Marketing Lead';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  category: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  urgency: 'Immediate' | 'Today' | 'This Week';
  type: 'Inventory' | 'Sales' | 'Marketing' | 'Fulfillment';
  actionButtonText: string;
  executed?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionSuggestions?: RecommendedAction[];
}
