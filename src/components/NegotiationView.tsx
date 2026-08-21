import React, { useState } from "react";
import {
  MessageSquareDiff,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  TrendingDown,
  Shield,
  FileCheck2,
  RefreshCw,
  Send,
} from "lucide-react";
import { AppTab, NegotiationSuggestion, VendorQuotation } from "../types";
import { requestAiNegotiation } from "../services/api";

interface NegotiationViewProps {
  negotiation: NegotiationSuggestion;
  vendorB: VendorQuotation;
  onNavigate: (tab: AppTab) => void;
}

export const NegotiationView: React.FC<NegotiationViewProps> = ({
  negotiation,
  vendorB,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [emailSubject, setEmailSubject] = useState(negotiation.generatedEmailDraft.subject);
  const [emailBody, setEmailBody] = useState(negotiation.generatedEmailDraft.body);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRegenerateWithAi = async () => {
    setIsRegenerating(true);
    try {
      const result = await requestAiNegotiation({
        vendorName: vendorB.companyName,
        product: "Enterprise Laptop",
        quantity: 100,
        currentPrice: vendorB.unitPrice,
        targetPrice: 45800,
      });
      setEmailSubject(result.subject);
      setEmailBody(result.body);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <span>Step 07</span>
            <span className="text-slate-300">•</span>
            <span>Commercial Optimization</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">AI Negotiation Strategy Assistant</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Data-backed tactical leverage points & counter-offer drafts for optimal vendor terms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="btn-negotiate-to-po"
            onClick={() => onNavigate("purchase-order")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>PROCEED TO PURCHASE ORDER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Price & Savings Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Target Negotiation Strategy for {vendorB.vendorName} ({vendorB.companyName})
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Suggested Target Range: ₹{negotiation.targetPriceRange.min.toLocaleString("en-IN")} – ₹
              {negotiation.targetPriceRange.max.toLocaleString("en-IN")} / unit
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Quoted: ₹{vendorB.unitPrice.toLocaleString("en-IN")} • Potential savings: ~₹
              {negotiation.potentialSavings.toLocaleString("en-IN")} on 100 units batch
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/15 text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-emerald-300 flex items-center justify-end gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> Direct Budget Savings
            </div>
            <div className="text-xl font-black text-white font-mono mt-0.5">
              ₹{(negotiation.potentialSavings / 100000).toFixed(2)} Lakhs
            </div>
          </div>
        </div>
      </div>

      {/* 4 Actionable Negotiation Tactics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            4 AI-Generated Tactical Leverage Points
          </h3>
          <span className="text-[11px] text-slate-500 italic">
            *AI-generated negotiation suggestions. (Does not guarantee vendor concessions).
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {negotiation.leveragePoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center font-mono">
                  0{index + 1}
                </div>
                <h4 className="text-xs font-bold text-slate-900">{point.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{point.description}</p>
              <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                Outcome: {point.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Email Counter-Offer Drafter */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              AI-Generated Corporate Negotiation Email Draft
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerateWithAi}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin text-indigo-600" : ""}`} />
              <span>Regenerate Draft</span>
            </button>

            <button
              id="btn-copy-negotiation-email"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Email Draft"}</span>
            </button>
          </div>
        </div>

        {/* Email Fields */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Subject Line:</label>
            <input
              type="text"
              id="input-negotiation-subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-900 font-medium text-xs bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Email Body:</label>
            <textarea
              id="textarea-negotiation-body"
              rows={8}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono text-xs leading-relaxed bg-slate-50/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
