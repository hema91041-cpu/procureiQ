import React from "react";
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageSquareDiff,
  FileCheck2,
  HelpCircle,
} from "lucide-react";
import { AppTab, VendorQuotation, RfqItem } from "../types";

interface RecommendationViewProps {
  vendors: VendorQuotation[];
  activeRfq: RfqItem;
  onNavigate: (tab: AppTab) => void;
  onApproveVendor: (vendor: VendorQuotation) => void;
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  vendors,
  activeRfq,
  onNavigate,
  onApproveVendor,
}) => {
  const vendorA = vendors.find((v) => v.vendorId === "VEND-A") || vendors[0];
  const vendorB = vendors.find((v) => v.vendorId === "VEND-B") || vendors[1];
  const vendorC = vendors.find((v) => v.vendorId === "VEND-C") || vendors[2];

  const handleApproveAndProceed = () => {
    onApproveVendor(vendorB);
    onNavigate("purchase-order");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            <span>Step 06</span>
            <span className="text-slate-300">•</span>
            <span>AI Explainable Decision Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">AI Vendor Award Recommendation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Multi-factor weighted evaluation prioritizing quality, SLA reliability, and Total Cost of Ownership (TCO).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-rec-to-negotiate"
            onClick={() => onNavigate("negotiation")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
          >
            <MessageSquareDiff className="w-4 h-4 text-indigo-600" />
            <span>Negotiation Assistant</span>
          </button>

          <button
            id="btn-rec-approve-vendor-b"
            onClick={handleApproveAndProceed}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>APPROVE VENDOR B & ISSUE PO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Vendor Decision Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Vendor A Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-500">VENDOR A</span>
              <span className="text-xs font-bold text-slate-600">Apex Tech</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-black text-slate-800 font-mono">{vendorA.score}</span>
              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
            </div>

            {/* Score Breakdown Bar */}
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between text-slate-600">
                <span>Unit Price:</span>
                <span className="font-mono font-semibold">₹{vendorA.unitPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Lead Time:</span>
                <span className="font-semibold">{vendorA.deliveryDays} Days (On-Time)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quality Score:</span>
                <span className="font-semibold">{vendorA.qualityScore}/100</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Warranty:</span>
                <span className="font-semibold">{vendorA.warrantyYears} Year</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500 font-medium">Qualified Secondary Alternate</span>
          </div>
        </div>

        {/* Vendor B Card - WINNER */}
        <div className="bg-gradient-to-b from-indigo-50/80 via-white to-indigo-50/40 rounded-2xl border-2 border-indigo-500 p-6 shadow-lg shadow-indigo-500/10 flex flex-col justify-between relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
            🏆 Recommended Best Vendor
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 mt-1">
              <span className="text-xs font-mono font-bold text-indigo-700">VENDOR B</span>
              <span className="text-xs font-bold text-indigo-900">BluePeak Systems</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-black text-indigo-700 font-mono">{vendorB.score}</span>
              <span className="text-xs text-indigo-500 font-bold">/ 100</span>
            </div>

            {/* Score Breakdown Bar */}
            <div className="space-y-2 text-xs border-t border-indigo-100 pt-3">
              <div className="flex justify-between text-slate-700">
                <span>Unit Price:</span>
                <span className="font-mono font-bold text-slate-900">₹{vendorB.unitPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Lead Time:</span>
                <span className="font-bold">3 Days (Fastest)</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Quality Score:</span>
                <span className="font-bold">95/100 (Tier-1)</span>
              </div>
              <div className="flex justify-between text-indigo-700 font-semibold">
                <span>Warranty:</span>
                <span className="font-bold">3 Years Comprehensive</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-100">
            <button
              id="btn-winner-select-b"
              onClick={handleApproveAndProceed}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Select & Approve Vendor B
            </button>
          </div>
        </div>

        {/* Vendor C Card - CHEAPEST BUT HIGH RISK */}
        <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs flex flex-col justify-between bg-rose-50/10">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-600">VENDOR C</span>
              <span className="text-xs font-semibold text-rose-800">CyberPulse Hardware</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-black text-rose-600 font-mono">{vendorC.score}</span>
              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
              <span className="ml-auto text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                High Risk
              </span>
            </div>

            {/* Score Breakdown Bar */}
            <div className="space-y-2 text-xs border-t border-rose-100 pt-3">
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Unit Price (Cheapest):</span>
                <span className="font-mono font-bold">₹{vendorC.unitPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-rose-600 font-semibold">
                <span>Lead Time:</span>
                <span className="font-bold">20 Days (Late SLA)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quality Score:</span>
                <span>78/100</span>
              </div>
              <div className="flex justify-between text-rose-600 font-bold">
                <span>RAM Spec:</span>
                <span>8GB (❌ 16GB Required)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-100 text-center">
            <span className="text-xs text-rose-600 font-semibold">Rejected: Spec Mismatch</span>
          </div>
        </div>
      </div>

      {/* AI Explainability & Justification Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WHY VENDOR B? */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 border-b border-emerald-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider">WHY VENDOR B IS RECOMMENDED</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Meets 100% Technical Specifications</strong>
                <span className="text-slate-600">
                  Delivers authentic 16GB DDR5 RAM, Intel i5, and 512GB NVMe SSD with full OEM certification.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Fastest Express Delivery (3 Days)</strong>
                <span className="text-slate-600">
                  Beats our 7-day required SLA by 4 business days, eliminating employee onboarding delays.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Highest Quality Index (95/100)</strong>
                <span className="text-slate-600">
                  Tier-1 ISO-certified manufacturing ensures lowest component failure rate across 100 units.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">3-Year Extended Warranty</strong>
                <span className="text-slate-600">
                  Saves ₹12,000+ per unit in AMC maintenance contracts compared to 1-year competitor warranties.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Lowest Overall Procurement Risk</strong>
                <span className="text-slate-600">
                  Standard Net 30 payment terms and zero risk flags detected by AI Risk Radar.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* WHY NOT VENDOR C? */}
        <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-800 border-b border-rose-100 pb-3">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider">WHY NOT VENDOR C? (CHEAPEST ≠ BEST)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">RAM Specification Mismatch (8GB vs 16GB)</strong>
                <span className="text-slate-600">
                  Quoted 8GB RAM fails our enterprise standard. Retrofitting 100 laptops with RAM sticks would cost ₹4,50,000 extra.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Critical Delivery Delay (20 Days vs 7 Days)</strong>
                <span className="text-slate-600">
                  13 days past our deployment deadline would cause unacceptable operational disruption for the project.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Substandard Quality Rating (78/100)</strong>
                <span className="text-slate-600">
                  Lower tier components and higher historical return rates increase IT servicing overhead.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Only 1-Year Warranty & 15-Day Payment Term</strong>
                <span className="text-slate-600">
                  Demands advance settlement within 15 days without providing long-term warranty protection.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Scoring Formula Explanation */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>ProcureIQ Transparent Weighted Scoring Model</span>
        </div>
        <p className="leading-relaxed">
          Scores are mathematically calculated based on:
          <strong className="text-slate-800"> Quality Index (30%)</strong>,
          <strong className="text-slate-800"> Price Competitiveness (25%)</strong>,
          <strong className="text-slate-800"> Delivery SLA Compliance (20%)</strong>,
          <strong className="text-slate-800"> Warranty Duration (15%)</strong>, and
          <strong className="text-slate-800"> Payment Terms (10%)</strong>, minus
          <strong className="text-rose-600"> Risk Penalties (-15 pts for specification failure)</strong>.
        </p>
      </div>
    </div>
  );
};
