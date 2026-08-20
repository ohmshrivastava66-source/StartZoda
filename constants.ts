
import { Stock } from './types';

export const INITIAL_CASH = 100000; // Adjusted to match the screenshot scales better (e.g. 25,400 Z)
export const MIS_MARGIN_MULTIPLIER = 5;

export const CHARGES = {
  BROKERAGE_MAX: 0,
  STT: 0.001,
  TXN_CHARGE: 0.0000345,
  GST: 0.18,
  SEBI_FEE: 0.000001,
};

export const MOCK_STOCKS: Stock[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: 22450.20, change: 185.30, changePercent: 0.85, sector: 'INDEX', lotSize: 50, history: [] },
  { symbol: 'SENSEX', name: 'BSE Sensex', price: 73810.15, change: -88.40, changePercent: -0.12, sector: 'INDEX', lotSize: 1, history: [] },
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 2985.40, change: 42.10, changePercent: 1.45, sector: 'NSE', lotSize: 1, history: [] },
  { symbol: 'INFY', name: 'Infosys Ltd.', price: 1420.10, change: -32.40, changePercent: -2.30, sector: 'NSE', lotSize: 1, history: [] },
  { symbol: 'STARTZODA', name: 'StartZoda Premium', price: 1250.00, change: 65.00, changePercent: 5.20, sector: 'PREMIUM', lotSize: 1, history: [] },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.50, change: -24.1, changePercent: -0.58, sector: 'NSE', lotSize: 1, history: [] },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1532.10, change: 4.2, changePercent: 0.27, sector: 'NSE', lotSize: 1, history: [] },
  { symbol: 'ZOMATO', name: 'Zomato Ltd.', price: 194.20, change: 8.4, changePercent: 4.52, sector: 'NSE', lotSize: 1, history: [], isNudge: true },
];
