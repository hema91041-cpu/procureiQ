import React from "react";
import {
  FileText,
  FileCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Package,
  Wallet,
  CheckCircle2,
  TrendingDown,
  Building2,
  PlusCircle,
} from "lucide-react";
import { AppTab, RfqItem, VendorQuotation, RiskItem, ErpSnapshot } from "../types";

interface DashboardViewProps {
  activeRfq: RfqItem;
  vendors: VendorQuotation[];
  risks: RiskItem[];
  erp: ErpSnapshot;
  onNavigate: (tab: AppTab) => void;
  onOpenDemoMode: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeRfq,
  vendors,
  risks,
  erp,
  onNavigate,
  onOpenDemoMode,
}) => {
  const recommendedVendor = vendors.find((v) => v.vendorId === "VEND-B") || vendors[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner / System Title */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AION 2026 Hackathon • Team CYBERHACKZ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
              PROCURE<span className="text-indigo-400">IQ</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Autonomous AI-Powered Smart Procurement & Vendor Evaluation System.
              Transforming unstructured vendor quotations into risk-evaluated, optimal procurement decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="btn-dash-create-rfq"
              onClick={() => onNavigate("create-rfq")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-all border border-white/15 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-indigo-300" />
              <span>Create New RFQ</span>
            </button>

            <button
              id="btn-dash-demo-tour"
              onClick={onOpenDemoMode}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>🎯 Start Demo Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          id="card-active-rfqs"
          onClick={() => onNavigate("create-rfq")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold text-slate-600">Active RFQs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">3</span>
            <span className="text-xs text-emerald-600 font-medium">1 in Evaluation</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Latest: Laptop Procurement (100 units)</p>
        </div>

        <div
          id="card-quotes-received"
          onClick={() => onNavigate("quotations")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold text-slate-600">Quotations Received</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">9</span>
            <span className="text-xs text-indigo-600 font-medium">3 for Active RFQ</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Vendors: A, B, and C submitted</p>
        </div>

        <div
          id="card-pending-decisions"
          onClick={() => onNavigate("recommendation")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold text-slate-600">Pending Decisions</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">2</span>
            <span className="text-xs text-amber-600 font-medium font-semibold">AI Ready for Award</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Vendor B approved for PO release</p>
        </div>

        <div
          id="card-risk-alerts"
          onClick={() => onNavigate("risk-radar")}
          className="bg-white p-5 rounded-xl border border-rose-200 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group bg-rose-50/20"
        >
          <div className="flex items-center justify-between text-rose-600 mb-3">
            <span className="text-xs font-semibold text-rose-700">Risk Alerts</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600 font-mono">{risks.length}</span>
            <span className="text-xs text-rose-600 font-medium">2 Critical Flags</span>
          </div>
          <p className="text-xs text-rose-600/80 mt-2">Spec mismatch detected in Vendor C</p>
        </div>
      </div>

      {/* Primary Highlight Card: Active Evaluation Scenario */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <span>Active Sourcing Case</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-mono">{activeRfq.rfqNumber}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeRfq.productName} Procurement — {activeRfq.quantity} Units
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Required: 16GB RAM, Intel i5, 512GB SSD • Lead time: 7 Days max • Budget: ₹50,00,000
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              AI Analysis Complete
            </span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommendation Spotlight */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 rounded-xl p-5 border border-indigo-100 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Top Recommended Supplier
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                  <span>🏆 {recommendedVendor.vendorName}</span>
                  <span className="text-xs font-normal text-slate-500">
                    ({recommendedVendor.companyName})
                  </span>
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-indigo-700 font-mono">
                  {recommendedVendor.score}/100
                </div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">ProcureIQ Score</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-2xs">
                <div className="text-slate-500 text-[11px]">Unit Price</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">
                  ₹{recommendedVendor.unitPrice.toLocaleString("en-IN")}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">Within Budget</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-2xs">
                <div className="text-slate-500 text-[11px]">Delivery Time</div>
                <div className="font-bold text-emerald-700 text-sm mt-0.5">3 Days</div>
                <div className="text-[10px] text-emerald-600 font-medium">4 Days Faster than SLA</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-2xs">
                <div className="text-slate-500 text-[11px]">Warranty</div>
                <div className="font-bold text-indigo-700 text-sm mt-0.5">3 Years</div>
                <div className="text-[10px] text-indigo-600 font-medium">3x Competitors</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-indigo-100/80 shadow-2xs">
                <div className="text-slate-500 text-[11px]">Quality Rating</div>
                <div className="font-bold text-emerald-700 text-sm mt-0.5">95/100</div>
                <div className="text-[10px] text-slate-500">Tier-1 Grade</div>
              </div>
            </div>

            {/* Why Vendor B Key Highlights */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5">
              <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Why Vendor B is Recommended over Vendor C (Cheaper):</span>
              </div>
              <ul className="text-slate-600 space-y-1 pl-4 list-disc text-[11px]">
                <li>
                  <strong className="text-slate-800">Zero Specification Risk:</strong> Fully complies
                  with 16GB RAM & Intel i5 requirement (Vendor C only quoted 8GB).
                </li>
                <li>
                  <strong className="text-slate-800">Mission-Critical Delivery:</strong> 3-day turnaround
                  avoids Vendor C's 20-day project delay risk.
                </li>
                <li>
                  <strong className="text-slate-800">Lower 3-Year TCO:</strong> 3-year warranty saves
                  ₹12,000+/unit in extended maintenance costs.
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="btn-dash-view-rec"
                onClick={() => onNavigate("recommendation")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>View Full Decision Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="btn-dash-view-compare"
                onClick={() => onNavigate("vendor-comparison")}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Compare 3 Vendors
              </button>

              <button
                id="btn-dash-view-po"
                onClick={() => onNavigate("purchase-order")}
                className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Generate PO-00124
              </button>
            </div>
          </div>

          {/* Quick ERP & Financial Impact Panel */}
          <div className="space-y-4">
            {/* Inventory Snapshot */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-indigo-600" />
                  ERP Inventory Impact
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                  Live Stock
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <div className="text-slate-500 text-[10px]">Current</div>
                  <div className="font-bold text-slate-800 text-sm mt-0.5">{erp.inventory.currentStock}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-indigo-100 text-indigo-700">
                  <div className="text-indigo-600 text-[10px]">Incoming</div>
                  <div className="font-bold text-indigo-700 text-sm mt-0.5">+{erp.inventory.incoming}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-100 text-emerald-700">
                  <div className="text-emerald-600 text-[10px]">Projected</div>
                  <div className="font-bold text-emerald-800 text-sm mt-0.5">{erp.inventory.projectedStock}</div>
                </div>
              </div>
            </div>

            {/* Financial Savings Snapshot */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  Procurement Budget Allocation
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                  Budget Surplus
                </span>
              </div>
              <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Approved Budget:</span>
                  <span className="font-mono font-medium">₹{erp.finance.totalBudget.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Selected Bid (Vendor B):</span>
                  <span className="font-mono font-semibold text-indigo-700">
                    ₹{erp.finance.selectedProcurement.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-xs font-bold">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Direct Savings:
                  </span>
                  <span className="text-emerald-700 font-mono">
                    ₹{erp.finance.remainingBudget.toLocaleString("en-IN")} (6.0%)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Risk Alert Callout */}
            <div
              onClick={() => onNavigate("risk-radar")}
              className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center justify-between cursor-pointer hover:bg-rose-100/70 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-rose-900 block">
                    Vendor C: 2 Critical Risks Found
                  </span>
                  <span className="text-rose-700 text-[11px]">
                    8GB RAM mismatch & 20-day delivery delay
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Complete Procurement Pipeline Overview (Interactive Stepper) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            ProcureIQ Autonomous Sourcing Lifecycle
          </h3>
          <span className="text-xs text-slate-500 font-medium">Step 6 of 8 Completed</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { id: "create-rfq", label: "1. Create RFQ", status: "done" },
            { id: "quotations", label: "2. Quotes (3)", status: "done" },
            { id: "ai-extraction", label: "3. Extraction", status: "done" },
            { id: "vendor-comparison", label: "4. Compare", status: "done" },
            { id: "risk-radar", label: "5. Risk Radar", status: "done" },
            { id: "recommendation", label: "6. Decision", status: "current" },
            { id: "negotiation", label: "7. Negotiate", status: "ready" },
            { id: "purchase-order", label: "8. Issue PO", status: "ready" },
          ].map((step, idx) => (
            <button
              key={step.id}
              onClick={() => onNavigate(step.id as AppTab)}
              className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                step.status === "done"
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200"
                  : step.status === "current"
                  ? "bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs"
                  : "bg-white border-dashed border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div className="text-[10px] opacity-70 mb-0.5">Step 0{idx + 1}</div>
              <div className="truncate font-medium">{step.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
