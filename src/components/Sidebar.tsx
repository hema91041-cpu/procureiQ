import React from "react";
import {
  LayoutDashboard,
  FilePlus2,
  FileSpreadsheet,
  Cpu,
  GitCompare,
  ShieldAlert,
  Award,
  MessageSquareDiff,
  FileCheck2,
  Play,
  Sparkles,
  Layers,
} from "lucide-react";
import { AppTab } from "../types";

interface SidebarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenDemoMode: () => void;
  quotationCount: number;
  riskCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenDemoMode,
  quotationCount,
  riskCount,
}) => {
  const navItems: {
    id: AppTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
    stepNumber?: string;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create-rfq", label: "1. Create RFQ", icon: FilePlus2, stepNumber: "01" },
    {
      id: "quotations",
      label: "2. Quotations",
      icon: FileSpreadsheet,
      badge: quotationCount,
      badgeColor: "bg-blue-100 text-blue-700",
      stepNumber: "02",
    },
    { id: "ai-extraction", label: "3. AI Extraction", icon: Cpu, stepNumber: "03" },
    { id: "vendor-comparison", label: "4. Comparison", icon: GitCompare, stepNumber: "04" },
    {
      id: "risk-radar",
      label: "5. Risk Radar",
      icon: ShieldAlert,
      badge: `${riskCount} Risks`,
      badgeColor: "bg-rose-100 text-rose-700 font-semibold",
      stepNumber: "05",
    },
    {
      id: "recommendation",
      label: "6. AI Recommendation",
      icon: Award,
      badge: "Best: B",
      badgeColor: "bg-emerald-100 text-emerald-700 font-bold",
      stepNumber: "06",
    },
    { id: "negotiation", label: "7. Negotiation", icon: MessageSquareDiff, stepNumber: "07" },
    {
      id: "purchase-order",
      label: "8. Purchase Order",
      icon: FileCheck2,
      badge: "PO Ready",
      badgeColor: "bg-indigo-100 text-indigo-700",
      stepNumber: "08",
    },
  ];

  return (
    <aside
      id="procureiq-sidebar"
      className="w-72 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 shrink-0 select-none h-screen sticky top-0"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                PROCURE<span className="text-indigo-400">IQ</span>
              </span>
              <span className="text-[10px] uppercase font-semibold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                AI ERP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Smart Procurement Sourcing</p>
          </div>
        </div>
      </div>

      {/* Demo Tour Button */}
      <div className="p-3">
        <button
          id="btn-demo-mode"
          onClick={onOpenDemoMode}
          className="w-full group relative flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium text-xs shadow-md shadow-indigo-900/40 transition-all active:scale-[0.98] border border-indigo-400/30 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="font-semibold text-sm">🎯 2-Min Hackathon Demo</span>
          </div>
          <Play className="w-3.5 h-3.5 fill-current text-indigo-100 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Sourcing Workflow Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Procurement Pipeline
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium ${
                    isActive ? "bg-white/20 text-white" : item.badgeColor || "bg-slate-700 text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Team / Hackathon Metadata Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="font-semibold text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> AION 2026
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
            Hackathon
          </span>
        </div>
        <div className="text-[11px] text-slate-400 leading-relaxed">
          <p className="font-medium text-slate-300">Team CYBERHACKZ</p>
          <p className="text-slate-400 text-[10px]">Arunai Engineering College, TVM</p>
        </div>
      </div>
    </aside>
  );
};
