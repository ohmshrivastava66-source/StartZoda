
import React, { useState } from 'react';
import { Stock, OrderType, OrderCharges } from '../types';
import { CHARGES, MIS_MARGIN_MULTIPLIER } from '../constants';
import { X, ChevronDown, Info } from 'lucide-react';

interface TradeModalProps {
  stock: Stock;
  initialType: 'BUY' | 'SELL';
  onClose: () => void;
  onExecute: (type: 'BUY' | 'SELL', product: OrderType, quantity: number, price: number) => void;
  userCash: number;
}

export const TradeModal: React.FC<TradeModalProps> = ({ stock, initialType, onClose, onExecute, userCash }) => {
  const [type, setType] = useState<'BUY' | 'SELL'>(initialType);
  const [product, setProduct] = useState<OrderType>('CNC');
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(stock.price);
  const [orderMode, setOrderMode] = useState<'MARKET' | 'LIMIT'>('MARKET');

  const calculateCharges = (): OrderCharges => {
    const value = quantity * price;
    const brokerage = 0;
    const txnCharges = value * CHARGES.TXN_CHARGE;
    const stt = value * CHARGES.STT;
    const gst = (brokerage + txnCharges) * CHARGES.GST;
    return { brokerage, stt, txnCharges, gst, total: brokerage + stt + txnCharges + gst };
  };

  const charges = calculateCharges();
  const requiredMargin = product === 'MIS' ? (quantity * price) / MIS_MARGIN_MULTIPLIER : (quantity * price);
  const totalCost = requiredMargin + charges.total;
  const canAfford = type === 'BUY' ? totalCost <= userCash : true;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-[1px] animate-in fade-in duration-200">
      <div className="bg-white rounded w-[450px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        {/* Kite Modal Header */}
        <div className={`p-4 flex justify-between items-center ${type === 'BUY' ? 'bg-[#4184f3]' : 'bg-[#ff5722]'} text-white`}>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[14px] uppercase tracking-wide">{type} {stock.symbol}</span>
            <span className="text-[10px] opacity-80 font-medium">NSE x 1 Qty</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-[11px] font-bold">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" checked readOnly className="w-3 h-3 accent-white" />
                NSE
              </label>
            </div>
            <button onClick={onClose} className="hover:bg-black/10 p-1 rounded transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Kite Order Form */}
        <div className="p-5 space-y-6">
          <div className="flex gap-10 text-[12px] font-bold text-[#444]">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${product === 'MIS' ? 'border-[#4184f3]' : 'border-gray-300'}`}>
                {product === 'MIS' && <div className="w-2 h-2 bg-[#4184f3] rounded-full" />}
              </div>
              <input type="radio" className="hidden" checked={product === 'MIS'} onChange={() => setProduct('MIS')} />
              <span>Intraday <span className="text-[#9b9b9b] font-normal">MIS</span></span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${product === 'CNC' ? 'border-[#4184f3]' : 'border-gray-300'}`}>
                {product === 'CNC' && <div className="w-2 h-2 bg-[#4184f3] rounded-full" />}
              </div>
              <input type="radio" className="hidden" checked={product === 'CNC'} onChange={() => setProduct('CNC')} />
              <span>Longterm <span className="text-[#9b9b9b] font-normal">CNC</span></span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[#9b9b9b] text-[11px] font-medium block">Qty</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} 
                className="w-full border border-[#eee] rounded px-3 py-2.5 text-[13px] focus:border-[#4184f3] outline-none transition-colors" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[#9b9b9b] text-[11px] font-medium block">Price</label>
              <input 
                type="number" 
                step="0.05" 
                disabled={orderMode === 'MARKET'}
                value={orderMode === 'MARKET' ? stock.price : price} 
                onChange={e => setPrice(Number(e.target.value))} 
                className={`w-full border border-[#eee] rounded px-3 py-2.5 text-[13px] outline-none transition-colors ${orderMode === 'MARKET' ? 'bg-[#fbfbfb] text-gray-400' : 'focus:border-[#4184f3]'}`} 
              />
            </div>
          </div>

          <div className="flex gap-6 border-b border-[#f9f9f9] pb-6">
             <div className="flex gap-4 text-[11px] font-bold text-[#444]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" checked={orderMode === 'MARKET'} onChange={() => setOrderMode('MARKET')} className="w-3 h-3 accent-[#4184f3]" />
                  Market
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" checked={orderMode === 'LIMIT'} onChange={() => setOrderMode('LIMIT')} className="w-3 h-3 accent-[#4184f3]" />
                  Limit
                </label>
             </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#9b9b9b]">
             <div className="flex items-center gap-1 cursor-pointer hover:text-[#444]">
               More options <ChevronDown size={12} />
             </div>
             <div className="flex items-center gap-2">
               <span>Margin: <span className="text-[#444] font-bold">₹{requiredMargin.toFixed(2)}</span></span>
               <Info size={12} className="cursor-help" />
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#fbfbfb] px-5 py-4 flex items-center justify-between border-t border-[#eee]">
           <div className="text-[11px] text-[#9b9b9b]">
              Approx. charges ₹{charges.total.toFixed(2)}
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => onExecute(type, product, quantity, orderMode === 'MARKET' ? stock.price : price)}
                disabled={!canAfford}
                className={`px-8 py-2.5 rounded font-bold text-[13px] text-white shadow-sm transition-all ${
                  type === 'BUY' ? 'bg-[#4184f3] hover:bg-[#3574e2]' : 'bg-[#ff5722] hover:bg-[#e64a19]'
                } disabled:grayscale disabled:opacity-50`}
              >
                {type}
              </button>
              <button 
                onClick={onClose} 
                className="px-6 py-2.5 border border-[#eee] bg-white rounded font-bold text-[13px] text-[#9b9b9b] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
