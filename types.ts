
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  cash: number;
  collateral: number;
  marginUsed: number;
  age: number;
  settings?: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface PortfolioHistoryPoint {
  time: string;
  value: number;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  lotSize: number;
  history: { time: string; price: number }[];
  isNudge?: boolean;
}

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  product: OrderType;
  quantity: number;
  price: number;
  charges: number;
  status: 'COMPLETE' | 'PENDING' | 'REJECTED';
  timestamp: Date;
}

export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  lastPrice: number;
  pnl: number;
  pnlPercent: number;
  product: OrderType;
}

export type OrderType = 'CNC' | 'MIS';

export interface OrderCharges {
  brokerage: number;
  stt: number;
  txnCharges: number;
  gst: number;
  total: number;
}
