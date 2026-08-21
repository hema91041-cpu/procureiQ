import React from "react";
import {
  GitCompare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Info,
} from "lucide-react";
import { AppTab, VendorQuotation, RfqItem } from "../types";

interface ComparisonViewProps {
  vendors: VendorQuotation[];
  activeRfq: RfqItem;
  onNavigate: (tab: AppTab) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  vendors,
  activeRfq,
  onNavigate,
}) => {
  const vendorA = vendors.find((v) => v.vendorId === "VEND-A") || vendors[0];
  const vendorB = vendors.find((v) => v.vendorId === "VEND-B") || vendors[1];
  const vendorC = vendors.find((v) => v.vendorId === "VEND-C") || vendors[2];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <span>Step 04</span>
            <span className="text-slate-300">•</span>
            <span>Comparative Matrix</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Vendor Quotation Comparison</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side parametric evaluation against mandatory RFQ criteria and SLA benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate("risk-radar")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Examine Risk Radar</span>
          </button>

          <button
            id="btn-comparison-to-rec"
            onClick={() => onNavigate("recommendation")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>View AI Recommendation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CHEAPEST ≠ BEST Key Concept Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/60 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-lg">
            ≠
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Core Procurement Discovery: CHEAPEST ≠ BEST</span>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded uppercase">
                Critical Demo Concept
              </span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              <strong>Vendor C offers the lowest unit price (₹42,000)</strong>, saving ₹5,00,000 on paper.
              However, ProcureIQ's AI detects that <strong>Vendor C ships only 8GB RAM</strong> (violating the 16GB spec) and takes <strong>20 days</strong> (causing 13 days of operational downtime).
              <strong> Vendor B (₹47,000) delivers the lowest Total Cost of Ownership (TCO) with 3-year warranty.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <GitCompare className="w-4 h-4 text-indigo-600" />
            <span>Multi-Vendor Feature & Parameter Matrix</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">100 Units Laptop RFQ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/80">
                <th className="py-4 px-5 font-bold text-slate-700 w-1/4 uppercase tracking-wider text-[11px]">
                  Evaluation Parameter
                </th>
                <th className="py-4 px-5 font-semibold text-slate-500 w-1/5 bg-slate-50/50">
                  Target RFQ Criteria
                </th>
                <th className="py-4 px-5 font-bold text-slate-900 w-1/5">
                  <div className="flex items-center gap-1.5">
                    <span>Vendor A</span>
                    <span className="text-[10px] text-slate-400 font-normal">Apex Tech</span>
                  </div>
                </th>
                <th className="py-4 px-5 font-bold text-indigo-900 w-1/5 bg-indigo-50/50 border-x border-indigo-100">
                  <div className="flex items-center gap-1.5">
                    <span className="text-indigo-700">Vendor B</span>
                    <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded font-bold">
                      🏆 BEST
                    </span>
                  </div>
                </th>
                <th className="py-4 px-5 font-bold text-slate-900 w-1/5 bg-rose-50/30">
                  <div className="flex items-center gap-1.5">
                    <span>Vendor C</span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                      Cheapest
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Unit Price Row */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-bold text-slate-800">Unit Price</td>
                <td className="py-3.5 px-5 text-slate-500">₹50,000 max</td>
                <td className="py-3.5 px-5 font-mono font-bold text-slate-800">₹45,000</td>
                <td className="py-3.5 px-5 font-mono font-bold text-indigo-950 bg-indigo-50/30 border-x border-indigo-100">
                  ₹47,000
                </td>
                <td className="py-3.5 px-5 font-mono font-bold text-emerald-700 bg-emerald-50/50">
                  <div className="flex items-center gap-1">
                    <span>₹42,000</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded">Lowest</span>
                  </div>
                </td>
              </tr>

              {/* Total Order Value */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-medium text-slate-700">Total Order (100 Units)</td>
                <td className="py-3.5 px-5 text-slate-500 font-mono">₹50,00,000</td>
                <td className="py-3.5 px-5 font-mono text-slate-800">₹45,00,000</td>
                <td className="py-3.5 px-5 font-mono font-semibold text-slate-900 bg-indigo-50/30 border-x border-indigo-100">
                  ₹47,00,000
                </td>
                <td className="py-3.5 px-5 font-mono text-slate-800 bg-rose-50/20">₹42,00,000</td>
              </tr>

              {/* Delivery Lead Time */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-bold text-slate-800">Delivery SLA</td>
                <td className="py-3.5 px-5 text-slate-500">7 Days Max</td>
                <td className="py-3.5 px-5 font-medium text-slate-800">7 Days (On Time)</td>
                <td className="py-3.5 px-5 font-bold text-emerald-700 bg-indigo-50/30 border-x border-indigo-100">
                  <div className="flex items-center gap-1.5">
                    <span>3 Days</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                      Fastest
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-5 font-bold text-rose-600 bg-rose-50/50">
                  <div className="flex items-center gap-1.5">
                    <span>20 Days</span>
                    <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-bold">
                      🔴 13d Late!
                    </span>
                  </div>
                </td>
              </tr>

              {/* Warranty Coverage */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-bold text-slate-800">Warranty Coverage</td>
                <td className="py-3.5 px-5 text-slate-500">1 Year Min</td>
                <td className="py-3.5 px-5 text-slate-700">1 Year Standard</td>
                <td className="py-3.5 px-5 font-bold text-indigo-700 bg-indigo-50/30 border-x border-indigo-100">
                  <div className="flex items-center gap-1.5">
                    <span>3 Years Comprehensive</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-semibold">
                      3x Longer
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-5 text-slate-700 bg-rose-50/20">1 Year Limited</td>
              </tr>

              {/* Quality QA Score */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-bold text-slate-800">Quality Score (QA)</td>
                <td className="py-3.5 px-5 text-slate-500">80/100 Min</td>
                <td className="py-3.5 px-5 text-slate-800 font-semibold">85 / 100</td>
                <td className="py-3.5 px-5 font-bold text-emerald-700 bg-indigo-50/30 border-x border-indigo-100">
                  95 / 100 (Tier-1)
                </td>
                <td className="py-3.5 px-5 font-bold text-rose-600 bg-rose-50/30">78 / 100 (Below target)</td>
              </tr>

              {/* RAM Specification */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-bold text-slate-800">Memory (RAM)</td>
                <td className="py-3.5 px-5 text-slate-500 font-semibold">16GB RAM</td>
                <td className="py-3.5 px-5 font-semibold text-emerald-700">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 16GB
                  </div>
                </td>
                <td className="py-3.5 px-5 font-semibold text-emerald-700 bg-indigo-50/30 border-x border-indigo-100">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 16GB DDR5
                  </div>
                </td>
                <td className="py-3.5 px-5 font-bold text-rose-600 bg-rose-50/50">
                  <div className="flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>8GB RAM (MISMATCH)</span>
                  </div>
                </td>
              </tr>

              {/* Storage */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-medium text-slate-700">Storage SSD</td>
                <td className="py-3.5 px-5 text-slate-500">512GB SSD</td>
                <td className="py-3.5 px-5 text-slate-800">512GB SSD</td>
                <td className="py-3.5 px-5 text-slate-800 bg-indigo-50/30 border-x border-indigo-100">
                  512GB NVMe SSD
                </td>
                <td className="py-3.5 px-5 text-slate-800 bg-rose-50/20">512GB SSD</td>
              </tr>

              {/* Payment Terms */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-medium text-slate-700">Payment Terms</td>
                <td className="py-3.5 px-5 text-slate-500">Net 30 Days</td>
                <td className="py-3.5 px-5 text-slate-800 font-medium">30 Days Credit</td>
                <td className="py-3.5 px-5 text-slate-800 font-medium bg-indigo-50/30 border-x border-indigo-100">
                  30 Days Net
                </td>
                <td className="py-3.5 px-5 text-amber-700 font-medium bg-rose-50/20">15 Days (Advance)</td>
              </tr>

              {/* Overall Risk Level */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-5 font-bold text-slate-800">Risk Assessment</td>
                <td className="py-3.5 px-5 text-slate-500">Zero Critical</td>
                <td className="py-3.5 px-5">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                    🟢 Low Risk
                  </span>
                </td>
                <td className="py-3.5 px-5 bg-indigo-50/30 border-x border-indigo-100">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    🟢 Optimal / Minimal Risk
                  </span>
                </td>
                <td className="py-3.5 px-5 bg-rose-50/50">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                    🔴 HIGH RISK (2 Criticals)
                  </span>
                </td>
              </tr>

              {/* ProcureIQ AI Score */}
              <tr className="bg-slate-50 font-bold">
                <td className="py-4 px-5 text-slate-900 text-sm">ProcureIQ AI Score</td>
                <td className="py-4 px-5 text-slate-400 text-xs">-</td>
                <td className="py-4 px-5 font-mono text-base text-slate-800">{vendorA.score} / 100</td>
                <td className="py-4 px-5 font-mono text-xl text-indigo-700 bg-indigo-100/50 border-x border-indigo-200">
                  {vendorB.score} / 100 🏆
                </td>
                <td className="py-4 px-5 font-mono text-base text-rose-600 bg-rose-50/50">
                  {vendorC.score} / 100
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
