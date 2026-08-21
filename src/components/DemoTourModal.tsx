import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
  Zap,
  Target,
} from "lucide-react";
import { AppTab } from "../types";

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: AppTab) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const demoSteps: {
    tab: AppTab;
    stepNumber: string;
    title: string;
    description: string;
    keyJudgeTakeaway: string;
    highlightMetric: string;
  }[] = [
    {
      tab: "create-rfq",
      stepNumber: "01",
      title: "1. Create & Define RFQ",
      description:
        "The procurement manager initiates an RFQ for 100 enterprise laptops with a ₹50 Lakh budget, 7-day urgent SLA, and 16GB RAM / Intel i5 specifications.",
      keyJudgeTakeaway: "Fast parameterized RFQ definition with automated specification constraints.",
      highlightMetric: "100 Units • 7-Day SLA • ₹50L Budget",
    },
    {
      tab: "quotations",
      stepNumber: "02",
      title: "2. Ingest Vendor Quotations",
      description:
        "Three distinct vendors submit quotations: Vendor A (₹45,000), Vendor B (₹47,000), and Vendor C (₹42,000 - the cheapest bidder).",
      keyJudgeTakeaway: "Multi-format quotation ingestion with 1-click instant demo loading.",
      highlightMetric: "3 Competitive Vendor Bids Loaded",
    },
    {
      tab: "ai-extraction",
      stepNumber: "03",
      title: "3. AI Entity & Spec Extraction",
      description:
        "ProcureIQ neural parsing extracts unit prices, warranty terms, QA ratings, and component specs from unstructured documents with 99.4% confidence.",
      keyJudgeTakeaway: "Eliminates tedious manual data entry across PDF/DOC vendor sheets.",
      highlightMetric: "100% Extraction Accuracy",
    },
    {
      tab: "vendor-comparison",
      stepNumber: "04",
      title: "4. Multi-Factor Comparison Matrix",
      description:
        "Visual side-by-side parametric matrix highlights where vendors diverge on SLA lead time, warranty, quality rating, and RAM capacity.",
      keyJudgeTakeaway: "Demonstrates that cheapest (Vendor C ₹42k) is NOT the best due to major trade-offs.",
      highlightMetric: "Cheapest ≠ Best Principle",
    },
    {
      tab: "risk-radar",
      stepNumber: "05",
      title: "5. Autonomous AI Risk Radar",
      description:
        "ProcureIQ automatically flags 2 critical high risks in Vendor C: only 8GB RAM (spec failure) and 20 days lead time (13 days late for project deadline).",
      keyJudgeTakeaway: "Prevents costly procurement blunders and compliance failures before contract signing.",
      highlightMetric: "2 Critical Risks Caught",
    },
    {
      tab: "recommendation",
      stepNumber: "06",
      title: "6. Explainable AI Vendor Award",
      description:
        "ProcureIQ awards Vendor B with a top score of 92/100 (vs A: 84, C: 72). Fully explains 'WHY Vendor B' and 'WHY NOT Vendor C'.",
      keyJudgeTakeaway: "Explainable AI procurement decision based on 3-year TCO and zero specification risk.",
      highlightMetric: "🏆 Vendor B (92/100) Awarded",
    },
    {
      tab: "negotiation",
      stepNumber: "07",
      title: "7. AI Negotiation Assistant",
      description:
        "Generates 4 tactical leverage points and a ready-to-dispatch counter-offer email to target ₹45,800/unit (saving ₹1.2L on the batch).",
      keyJudgeTakeaway: "Data-backed commercial negotiation assistance directly from evaluation data.",
      highlightMetric: "Target: ₹45,800 (~₹1.2L Savings)",
    },
    {
      tab: "purchase-order",
      stepNumber: "08",
      title: "8. Purchase Order Generation & Dispatch",
      description:
        "Instantly produces authorized, printable Purchase Order PO-00124 for ₹47,00,000 + GST with verified line items and digital approval stamp.",
      keyJudgeTakeaway: "Seamless end-to-end flow from RFQ initiation to binding PO fulfillment.",
      highlightMetric: "PO-00124 Print & Export Ready",
    },
  ];

  const currentStepData = demoSteps[currentStep];

  useEffect(() => {
    if (isOpen) {
      onNavigateTab(currentStepData.tab);
    }
  }, [currentStep, isOpen]);

  useEffect(() => {
    let timer: any;
    if (isAutoPlay && isOpen) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= demoSteps.length - 1) {
            setIsAutoPlay(false);
            return prev;
          }
          return prev + 1;
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJumpToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none animate-fadeIn">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl border border-indigo-500/40 shadow-2xl p-5 max-w-2xl w-full pointer-events-auto ring-4 ring-indigo-500/10">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-wider">
              ProcureIQ Live Demo Tour
            </span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
              Step {currentStep + 1} of {demoSteps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isAutoPlay ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoPlay ? "Pause Auto" : "Auto-Play"}</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="py-3.5 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>{currentStepData.title}</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentStepData.description}</p>
            </div>
            <div className="bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-mono font-bold px-2.5 py-1.5 rounded-lg shrink-0 text-right">
              {currentStepData.highlightMetric}
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/80 text-xs flex items-center gap-2 text-indigo-200">
            <Target className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Presenter Speaking Note:</strong> {currentStepData.keyJudgeTakeaway}
            </span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
          {/* Step Dots */}
          <div className="flex items-center gap-1.5">
            {demoSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpToStep(idx)}
                title={step.title}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStep
                    ? "w-6 bg-indigo-500"
                    : idx < currentStep
                    ? "w-2 bg-emerald-400"
                    : "w-2 bg-slate-700"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              id="btn-demo-next-step"
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              <span>{currentStep === demoSteps.length - 1 ? "Finish Demo" : "Next Step"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
