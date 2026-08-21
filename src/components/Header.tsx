import React from "react";
import { Sparkles, RefreshCw, Zap, ShieldCheck } from "lucide-react";
import { RfqItem } from "../types";

interface HeaderProps {
  activeRfq: RfqItem;
  onResetDemo: () => void;
  onOpenDemoMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRfq,
  onResetDemo,
  onOpenDemoMode,
}) => {
  return (
    <header
      id="procureiq-header"
      className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between shadow-xs"
    >
      {/* Left: Active RFQ Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-semibold text-slate-700">
            {activeRfq.rfqNumber}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-medium text-slate-800">
            {activeRfq.productName} ({activeRfq.quantity} Units)
          </span>
          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
            Budget: ₹{(activeRfq.budget / 100000).toFixed(1)} Lakhs
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium">AI Recommendation: Vendor B (92/100)</span>
        </div>
      </div>

      {/* Right: Quick Demo Actions */}
      <div className="flex items-center gap-2.5">
        <button
          id="btn-header-reset-demo"
          onClick={onResetDemo}
          title="Reload fresh demo dataset"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Load Demo Quotations</span>
        </button>

        <button
          id="btn-header-launch-demo"
          onClick={onOpenDemoMode}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Demo Tour (2 Mins)</span>
        </button>

        <div className="hidden md:flex items-center gap-1 text-[11px] font-medium text-slate-500 pl-2 border-l border-slate-200">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>AION 2026</span>
        </div>
      </div>
    </header>
  );
};
