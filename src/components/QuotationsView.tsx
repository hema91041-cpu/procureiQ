import React, { useState } from "react";
import {
  Upload,
  RefreshCw,
  Cpu,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Eye,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AppTab, VendorQuotation } from "../types";

interface QuotationsViewProps {
  vendors: VendorQuotation[];
  onReloadDemo: () => void;
  onNavigate: (tab: AppTab) => void;
}

export const QuotationsView: React.FC<QuotationsViewProps> = ({
  vendors,
  onReloadDemo,
  onNavigate,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<VendorQuotation | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadToast(`Quotation document "${file.name}" ingested successfully! Loaded for AI Parsing.`);
        setTimeout(() => setUploadToast(null), 4000);
      }, 800);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <span>Step 02</span>
            <span className="text-slate-300">•</span>
            <span>Vendor Quotation Intake</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Vendor Quotations Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Received bids for Laptop Procurement (100 units). Ingest, inspect, and route to AI Extraction.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-load-demo-quotations"
            onClick={onReloadDemo}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>LOAD DEMO QUOTATIONS</span>
          </button>

          <button
            id="btn-analyse-with-ai"
            onClick={() => onNavigate("ai-extraction")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-indigo-200" />
            <span>ANALYSE WITH AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Upload Toast */}
      {uploadToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{uploadToast}</span>
        </div>
      )}

      {/* File Upload Simulator Dropzone */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-6 text-center transition-colors">
        <input
          type="file"
          id="file-upload-input"
          accept=".pdf,.docx,.txt,.csv,.json"
          onChange={handleSimulatedUpload}
          className="hidden"
        />
        <label
          htmlFor="file-upload-input"
          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-indigo-600">
            {isUploading ? <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" /> : <Upload className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 hover:underline">Click to upload quotation files</span>
            <span className="text-xs text-slate-500"> or drag and drop (PDF, DOCX, TXT, JSON)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Demo quotes already active below. You can also upload custom PDF quotes for live parsing.
          </p>
        </label>
      </div>

      {/* Quotation Cards Grid (Vendor A, Vendor B, Vendor C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {vendors.map((vendor) => {
          const isRec = vendor.vendorId === "VEND-B";
          const isCheapest = vendor.vendorId === "VEND-C";

          return (
            <div
              key={vendor.id}
              id={`card-quotation-${vendor.vendorId.toLowerCase()}`}
              className={`bg-white rounded-2xl border transition-all relative flex flex-col justify-between ${
                isRec
                  ? "border-indigo-300 ring-2 ring-indigo-500/20 shadow-md"
                  : isCheapest
                  ? "border-rose-200 shadow-xs"
                  : "border-slate-200 shadow-xs"
              }`}
            >
              {/* Header Badge */}
              <div className="p-5 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 font-mono">{vendor.vendorName}</span>
                    {isRec && (
                      <span className="text-[10px] uppercase font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full border border-indigo-200">
                        🏆 Top Score
                      </span>
                    )}
                    {isCheapest && (
                      <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                        ⚡ Cheapest
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate max-w-[200px]">{vendor.companyName}</p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 font-mono">
                    ₹{vendor.unitPrice.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">per unit</div>
                </div>
              </div>

              {/* Specs & Parameter Breakdown */}
              <div className="p-5 space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Delivery Lead Time
                  </span>
                  <span
                    className={`font-semibold ${
                      vendor.deliveryDays <= 3
                        ? "text-emerald-700 font-bold"
                        : vendor.deliveryDays > 7
                        ? "text-rose-600 font-bold"
                        : "text-slate-800"
                    }`}
                  >
                    {vendor.deliveryDays} Days {vendor.deliveryDays > 7 && "(Late SLA!)"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-slate-400" /> Warranty
                  </span>
                  <span className={`font-semibold ${vendor.warrantyYears >= 3 ? "text-indigo-700" : "text-slate-800"}`}>
                    {vendor.warrantyYears} {vendor.warrantyYears === 1 ? "Year" : "Years"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Quality QA Index
                  </span>
                  <span className="font-bold text-slate-800">{vendor.qualityScore}/100</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-500">RAM Specification</span>
                  <span
                    className={`font-semibold ${
                      vendor.specs.ramGb < 16 ? "text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded" : "text-slate-800"
                    }`}
                  >
                    {vendor.specs.ram} {vendor.specs.ramGb < 16 && "❌ Mismatch"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-50">
                  <span className="text-slate-500">Storage</span>
                  <span className="font-semibold text-slate-800">{vendor.specs.storage}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Payment Terms</span>
                  <span className="font-semibold text-slate-800">{vendor.paymentTermsDays} Days</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 rounded-b-2xl border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDoc(vendor)}
                  className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Raw Quote Doc</span>
                </button>

                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  Total: ₹{(vendor.totalPrice / 100000).toFixed(2)}L
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Raw Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm">
                  Raw Ingested Quotation Sheet: {selectedDoc.vendorName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 font-mono text-xs text-slate-800 bg-slate-50 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto border-b border-slate-200">
              {selectedDoc.rawDocumentSnippet}
            </div>

            <div className="p-4 bg-white flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
