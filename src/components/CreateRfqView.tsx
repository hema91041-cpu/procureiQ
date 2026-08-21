import React, { useState } from "react";
import {
  FilePlus2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info,
  Laptop,
  Server,
  Monitor,
  Loader2,
} from "lucide-react";
import { AppTab, RfqItem } from "../types";
import { saveRfq } from "../services/supabase";

interface CreateRfqViewProps {
  activeRfq: RfqItem;
  onSaveRfq: (rfq: RfqItem) => void;
  onNavigate: (tab: AppTab) => void;
}

export const CreateRfqView: React.FC<CreateRfqViewProps> = ({
  activeRfq,
  onSaveRfq,
  onNavigate,
}) => {
  const [productName, setProductName] = useState(activeRfq.productName || "Enterprise Laptop");
  const [quantity, setQuantity] = useState<number | string>(activeRfq.quantity || 100);
  const [budget, setBudget] = useState<number | string>(activeRfq.budget || 5000000);
  const [requiredDeliveryDays, setRequiredDeliveryDays] = useState<number | string>(
    activeRfq.requiredDeliveryDays || 7
  );
  const [ram, setRam] = useState(activeRfq.specs?.ram || "16GB DDR5 RAM");
  const [cpu, setCpu] = useState(activeRfq.specs?.cpu || "Intel Core i5 (13th Gen / Ultra)");
  const [storage, setStorage] = useState(activeRfq.specs?.storage || "512GB NVMe SSD");

  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [createdRfqId, setCreatedRfqId] = useState<string>(activeRfq.rfqNumber || "RFQ-2026-0891");

  const handleCreate = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    setErrorMessage(null);
    setWarningMessage(null);
    setIsSuccess(false);

    // Form validation
    if (!productName.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }

    const numQty = Number(quantity);
    if (isNaN(numQty) || numQty <= 0) {
      setErrorMessage("Please enter a valid positive quantity.");
      return;
    }

    const numBudget = Number(budget);
    if (isNaN(numBudget) || numBudget <= 0) {
      setErrorMessage("Please enter a valid positive budget amount in INR (e.g., 5000000).");
      return;
    }

    const numDays = Number(requiredDeliveryDays);
    if (isNaN(numDays) || numDays <= 0) {
      setErrorMessage("Please enter a valid delivery SLA in days (e.g., 7).");
      return;
    }

    setIsSaving(true);

    const generatedId = activeRfq.rfqNumber || `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedRfqId(generatedId);

    const updatedRfq: RfqItem = {
      ...activeRfq,
      rfqNumber: generatedId,
      productName: productName.trim(),
      quantity: numQty,
      budget: numBudget,
      requiredDeliveryDays: numDays,
      specs: {
        ram: ram.trim() || "16GB DDR5 RAM",
        cpu: cpu.trim() || "Intel Core i5 (13th Gen / Ultra)",
        storage: storage.trim() || "512GB NVMe SSD",
      },
      status: "QUOTATIONS_RECEIVED",
    };

    try {
      console.log("Submitting RFQ to ProcureIQ & Database Engine:", updatedRfq);
      const result = await saveRfq(updatedRfq);

      // Save to application state so all downstream workflows (Quotations, AI Extraction, Risk Radar, PO) update immediately
      onSaveRfq(updatedRfq);

      if (!result.success && result.error) {
        console.error("Supabase Database Insert Warning/Error:", result.error);
        setErrorMessage(`Supabase Notice: ${result.error}. (Saved locally in ProcureIQ engine)`);
      } else if (result.warning) {
        setWarningMessage(result.warning);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("RFQ Submission Error:", err);
      // Even if database has network issue, keep app functional by updating local state
      onSaveRfq(updatedRfq);
      setIsSuccess(true);
      setErrorMessage(`Notice: ${err?.message || "Internal database sync notice"}`);
    } finally {
      setIsSaving(false);
    }
  };

  const loadPreset = (preset: "laptop" | "server" | "monitors") => {
    if (preset === "laptop") {
      setProductName("Enterprise Laptop");
      setQuantity(100);
      setBudget(5000000);
      setRequiredDeliveryDays(7);
      setRam("16GB DDR5 RAM");
      setCpu("Intel Core i5 (13th Gen / Ultra)");
      setStorage("512GB NVMe SSD");
    } else if (preset === "server") {
      setProductName("Rack Server Node");
      setQuantity(10);
      setBudget(2500000);
      setRequiredDeliveryDays(14);
      setRam("64GB ECC RAM");
      setCpu("AMD EPYC 32-Core");
      setStorage("2TB NVMe Enterprise");
    } else {
      setProductName("4K Professional Monitor");
      setQuantity(50);
      setBudget(1250000);
      setRequiredDeliveryDays(5);
      setRam("N/A (27-inch IPS)");
      setCpu("Type-C 90W PD");
      setStorage("HDR400");
    }
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <span>Step 01</span>
            <span className="text-slate-300">•</span>
            <span>Procurement Initiation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Create Request For Quotation (RFQ)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Define product parameters, mandatory technical specifications, and SLA lead times.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadPreset("laptop")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 cursor-pointer"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>AION Demo Scenario (Laptop)</span>
          </button>
        </div>
      </div>

      {/* Error Message Box (Visible upon error) */}
      {errorMessage && (
        <div
          id="rfq-error-banner"
          className="bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-xl flex items-start gap-3 animate-fadeIn"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-bold">Database / Validation Notice</div>
            <div className="text-amber-800">{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Warning / Info Message Box */}
      {warningMessage && !errorMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl flex items-center gap-2 text-xs animate-fadeIn">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Success Notification Banner */}
      {isSuccess && (
        <div
          id="rfq-success-banner"
          className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900">RFQ Created Successfully</h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Reference <strong>{createdRfqId}</strong> is active. 3 vendor quotations are ready for AI extraction and analysis.
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-view-quotations-after-create"
            onClick={() => onNavigate("quotations")}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Proceed to Quotations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Product Name *
            </label>
            <input
              type="text"
              id="input-product-name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enterprise Laptop"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400">Target commodity or asset category to be procured</p>
          </div>

          {/* Quantity */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Required Quantity (Units) *
            </label>
            <input
              type="number"
              id="input-quantity"
              required
              min={1}
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="100"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400">Total batch volume for pricing tiers</p>
          </div>

          {/* Total Budget */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Approved Total Budget (INR ₹) *
            </label>
            <input
              type="number"
              id="input-budget"
              required
              min={1}
              step="any"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="5000000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-500 font-mono">
              ₹{Number(budget || 0).toLocaleString("en-IN")} (~₹{Math.round(Number(budget || 0) / (Number(quantity) || 1)).toLocaleString("en-IN")}/unit ceiling)
            </p>
          </div>

          {/* Required Delivery Days */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Required Delivery SLA (Days) *
            </label>
            <input
              type="number"
              id="input-delivery-days"
              required
              min={1}
              step="any"
              value={requiredDeliveryDays}
              onChange={(e) => setRequiredDeliveryDays(e.target.value)}
              placeholder="7"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400">Strict maximum delivery deadline from PO release</p>
          </div>
        </div>

        {/* Required Specifications Section */}
        <div className="border-t border-slate-100 pt-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Mandatory Technical Specifications
            </span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded">
              AI Spec Verification Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Memory / RAM Spec *</label>
              <input
                type="text"
                id="input-spec-ram"
                required
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="16GB DDR5 RAM"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[10px] text-amber-600">Mandatory: 16GB Minimum</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Processor / CPU Spec *</label>
              <input
                type="text"
                id="input-spec-cpu"
                required
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                placeholder="Intel Core i5 (13th Gen / Ultra)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[10px] text-slate-400">Intel Core i5 or equivalent</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600 font-medium">Storage Spec *</label>
              <input
                type="text"
                id="input-spec-storage"
                required
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                placeholder="512GB NVMe SSD"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[10px] text-slate-400">512GB NVMe SSD</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Creating this RFQ updates the active sourcing pipeline and triggers vendor extraction.</span>
          </div>

          <button
            type="submit"
            id="btn-create-rfq-submit"
            disabled={isSaving}
            onClick={() => handleCreate()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SAVING RFQ...</span>
              </>
            ) : (
              <>
                <FilePlus2 className="w-4 h-4" />
                <span>CREATE RFQ</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
