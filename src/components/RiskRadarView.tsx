import React from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  Info,
} from "lucide-react";
import { AppTab, RiskItem } from "../types";

interface RiskRadarViewProps {
  risks: RiskItem[];
  onNavigate: (tab: AppTab) => void;
}

export const RiskRadarView: React.FC<RiskRadarViewProps> = ({
  risks,
  onNavigate,
}) => {
  const highRisks = risks.filter((r) => r.severity === "HIGH");
  const mediumRisks = risks.filter((r) => r.severity === "MEDIUM");
  const lowRisks = risks.filter((r) => r.severity === "LOW");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
            <span>Step 05</span>
            <span className="text-slate-300">•</span>
            <span>Autonomous Risk Detection</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">AI Risk Radar & Anomaly Detection</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous automated scan identifying specification mismatches, SLA breach risks, and price anomalies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="btn-risk-to-recommendation"
            onClick={() => onNavigate("recommendation")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Proceed to AI Recommendation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Risk Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-rose-600 text-xs font-semibold">
            <span>Critical High Risks</span>
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-rose-700 font-mono mt-1">{highRisks.length}</div>
          <div className="text-[11px] text-rose-600/80 mt-1">Vendor C: RAM & Delivery SLA</div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
            <span>Medium Anomalies</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-amber-700 font-mono mt-1">{mediumRisks.length}</div>
          <div className="text-[11px] text-amber-700/80 mt-1">Low Price / Dilution Alert</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
            <span>Commercial Terms</span>
            <Info className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-blue-700 font-mono mt-1">{lowRisks.length}</div>
          <div className="text-[11px] text-blue-700/80 mt-1">15-Day Payment Settlement</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Vendor B Risk Status</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">0 Risks</div>
          <div className="text-[11px] text-emerald-700/80 mt-1">100% Spec & SLA Compliant</div>
        </div>
      </div>

      {/* Detected Risks Breakdown Cards */}
      <div className="space-y-4">
        {risks.map((risk, index) => {
          const isHigh = risk.severity === "HIGH";
          const isMedium = risk.severity === "MEDIUM";

          return (
            <div
              key={risk.id}
              id={`risk-card-${index + 1}`}
              className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
                isHigh
                  ? "border-rose-300 ring-1 ring-rose-500/20"
                  : isMedium
                  ? "border-amber-300 ring-1 ring-amber-500/10"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isHigh
                        ? "bg-rose-100 text-rose-700"
                        : isMedium
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {isHigh ? <AlertOctagon className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{risk.riskCode}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          isHigh
                            ? "bg-rose-100 text-rose-800"
                            : isMedium
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {risk.severity === "HIGH" ? "🔴 HIGH RISK" : isMedium ? "🟡 MEDIUM RISK" : "🔵 LOW RISK"}
                      </span>
                      <span className="text-xs font-bold text-slate-700">• {risk.vendorName}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{risk.title}</h3>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shrink-0">
                  <div className="text-slate-500 text-[10px]">Required vs Quoted</div>
                  <div className="font-semibold text-slate-800">
                    <span className="text-emerald-700 font-bold">{risk.requiredValue}</span> vs{" "}
                    <span className="text-rose-600 font-bold">{risk.quotedValue}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3.5 text-xs">
                <div>
                  <div className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider mb-1">
                    Risk Description
                  </div>
                  <p className="text-slate-700 leading-relaxed">{risk.description}</p>
                </div>

                <div>
                  <div className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider mb-1">
                    Business Impact
                  </div>
                  <p className="text-slate-700 leading-relaxed">{risk.businessImpact}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="font-semibold text-indigo-700 text-[11px] uppercase tracking-wider mb-1">
                    AI Mitigation Recommendation
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed">{risk.mitigationAction}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
