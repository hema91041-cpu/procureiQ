import React, { useState, useEffect } from "react";
import {
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileCheck,
  RefreshCw,
  Zap,
} from "lucide-react";
import { AppTab, VendorQuotation, RfqItem } from "../types";

interface AiExtractionViewProps {
  vendors: VendorQuotation[];
  activeRfq: RfqItem;
  onNavigate: (tab: AppTab) => void;
}

export const AiExtractionView: React.FC<AiExtractionViewProps> = ({
  vendors,
  activeRfq,
  onNavigate,
}) => {
  const [pipelineStep, setPipelineStep] = useState<number>(5);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const pipelineStages = [
    { title: "Reading unstructured quotation PDFs & documents...", desc: "Ingesting OCR text streams & vendor letterheads" },
    { title: "Extracting vendor company entities & commercial terms...", desc: "Extracting GSTIN, unit rates & volume pricing" },
    { title: "Verifying hardware specifications against RFQ...", desc: "Comparing RAM (16GB vs 8GB), CPU & SSD parameters" },
    { title: "Analysing logistics lead times & SLA delivery windows...", desc: "Validating 7-day cutoff vs 3-day & 20-day commitments" },
    { title: "Evaluating warranty tiers & payment risk indices...", desc: "Mapping 3-year vs 1-year coverage and Net 30 terms" },
  ];

  const handleReRunExtraction = () => {
    setIsProcessing(true);
    setPipelineStep(0);

    const interval = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsProcessing(false);
          return 5;
        }
        return prev + 1;
      });
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <span>Step 03</span>
            <span className="text-slate-300">•</span>
            <span>Intelligent Entity Extraction</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">AI Quotation Data Extraction</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Neural document intelligence parsing raw quotations into validated structured procurement records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReRunExtraction}
            disabled={isProcessing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? "animate-spin text-indigo-600" : ""}`} />
            <span>Re-Run AI Extraction</span>
          </button>

          <button
            id="btn-proceed-to-comparison"
            onClick={() => onNavigate("vendor-comparison")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Proceed to Vendor Comparison</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live AI Processing State Pipeline Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-white">AI Document Intelligence Engine</h3>
              <p className="text-[11px] text-slate-400">Processing 3 vendor quotation payloads with Gemini 3.7 Flash</p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Extraction Confidence: 99.4%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {pipelineStages.map((stage, idx) => {
            const isDone = pipelineStep > idx;
            const isCurrent = pipelineStep === idx;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isDone
                    ? "bg-slate-800/80 border-emerald-500/40 text-slate-200"
                    : isCurrent
                    ? "bg-indigo-950/80 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/30 animate-pulse"
                    : "bg-slate-800/30 border-slate-800 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  )}
                </div>
                <div className="font-semibold text-xs leading-tight mb-1 text-slate-200">{stage.title}</div>
                <div className="text-[10px] text-slate-400 leading-snug">{stage.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured Extracted Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Extracted Structured Procurement Records</h3>
          </div>
          <span className="text-xs text-slate-500">3 of 3 records verified & normalized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Vendor Name</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Delivery SLA</th>
                <th className="py-3.5 px-4">Warranty</th>
                <th className="py-3.5 px-4">QA Index</th>
                <th className="py-3.5 px-4">Extracted Specs (RAM / Storage)</th>
                <th className="py-3.5 px-4">Payment Terms</th>
                <th className="py-3.5 px-4 text-right">Spec Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendors.map((vendor) => {
                const isCompliant = vendor.specs.ramGb >= 16;
                return (
                  <tr key={vendor.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{vendor.vendorName}</div>
                      <div className="text-[11px] text-slate-500">{vendor.companyName}</div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-900 text-sm">
                      ₹{vendor.unitPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-semibold ${
                          vendor.deliveryDays <= 3
                            ? "text-emerald-700"
                            : vendor.deliveryDays > 7
                            ? "text-rose-600 font-bold"
                            : "text-slate-800"
                        }`}
                      >
                        {vendor.deliveryDays} Days
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {vendor.warrantyYears} {vendor.warrantyYears === 1 ? "Year" : "Years"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900">{vendor.qualityScore}</span>
                      <span className="text-slate-400">/100</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{vendor.specs.ram}</div>
                      <div className="text-[11px] text-slate-500">{vendor.specs.storage}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">Net {vendor.paymentTermsDays} Days</td>
                    <td className="py-4 px-4 text-right">
                      {isCompliant ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Compliant
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                          ⚠️ Spec Mismatch
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
