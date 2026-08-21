import React, { useState } from "react";
import {
  Printer,
  FileCheck2,
  Download,
  CheckCircle2,
  Building2,
  Send,
  Sparkles,
  ShieldCheck,
  Package,
} from "lucide-react";
import { PurchaseOrder, VendorQuotation, RfqItem } from "../types";

interface PurchaseOrderViewProps {
  po: PurchaseOrder;
  vendorB: VendorQuotation;
  activeRfq: RfqItem;
}

export const PurchaseOrderView: React.FC<PurchaseOrderViewProps> = ({
  po,
  vendorB,
  activeRfq,
}) => {
  const [isDispatched, setIsDispatched] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(po, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${po.poNumber}-PurchaseOrder.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDispatch = () => {
    setIsDispatched(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Action Header (Hidden during Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            <span>Step 08</span>
            <span className="text-slate-300">•</span>
            <span>Final Sourcing Fulfillment</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Generated Purchase Order</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official contract authorization issued to Vendor B (BluePeak Systems).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-export-po-json"
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            id="btn-print-po"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>DOWNLOAD / PRINT PO</span>
          </button>
        </div>
      </div>

      {/* Dispatched Toast */}
      {isDispatched && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-medium flex items-center justify-between animate-fadeIn print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Purchase Order {po.poNumber} successfully dispatched via EDI to {po.vendorEmail}!
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
            EDI Synced
          </span>
        </div>
      )}

      {/* Official Enterprise Purchase Order Document */}
      <div
        id="purchase-order-document"
        className="bg-white rounded-2xl border border-slate-300 shadow-lg p-8 sm:p-10 space-y-8 text-slate-900 relative print:border-none print:shadow-none print:p-0"
      >
        {/* Document Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-900 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm">
                PIQ
              </div>
              <span className="text-xl font-bold tracking-tight font-mono">
                PROCURE<span className="text-indigo-600">IQ</span> ENTERPRISE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Corporate Sourcing & Supply Chain Operations</p>
            <p className="text-[11px] text-slate-400">Arunai Tech Park, Cyber Corridor, TVM - 606603</p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 inline-block mb-1">
              {po.poNumber}
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">PURCHASE ORDER</h2>
            <div className="text-xs text-slate-500 font-medium mt-1">Date: {po.issuedDate}</div>
            <div className="text-xs text-slate-500 font-mono">Reference: {po.rfqNumber}</div>
          </div>
        </div>

        {/* Vendor & Delivery Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              VENDOR / SUPPLIER DETAILS
            </span>
            <div className="font-bold text-slate-900 text-sm">{po.vendorName}</div>
            <div className="text-slate-600">{po.vendorAddress}</div>
            <div className="text-slate-600 font-mono">GSTIN: {po.vendorGst}</div>
            <div className="text-slate-600">Email: {po.vendorEmail}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              DELIVERY & PAYMENT SPECIFICATIONS
            </span>
            <div className="flex justify-between">
              <span className="text-slate-500">Committed Delivery:</span>
              <span className="font-bold text-emerald-700">{po.deliveryTimelineDays} Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">OEM Warranty Coverage:</span>
              <span className="font-bold text-indigo-700">{po.warrantyYears} Years Comprehensive</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Terms:</span>
              <span className="font-semibold text-slate-800">{po.paymentTerms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping Mode:</span>
              <span className="font-medium text-slate-700">Express Insured Courier</span>
            </div>
          </div>
        </div>

        {/* Itemized Line Items Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Item & Technical Specifications</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Unit Price (INR)</th>
                <th className="py-3 px-4 text-right">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 px-4 font-mono text-slate-500">01</td>
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-900 text-sm">{po.productName}</div>
                  <div className="text-slate-600 mt-1 space-y-0.5 text-[11px]">
                    <div>• RAM: {po.specs.ram}</div>
                    <div>• Processor: {po.specs.cpu}</div>
                    <div>• Storage: {po.specs.storage}</div>
                    <div>• 3-Year Onsite OEM Warranty Certified</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-bold text-slate-900">{po.quantity}</td>
                <td className="py-4 px-4 text-right font-mono font-medium text-slate-800">
                  ₹{po.unitPrice.toLocaleString("en-IN")}
                </td>
                <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                  ₹{po.totalPrice.toLocaleString("en-IN")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Calculations & Approvals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2 text-xs text-slate-600">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              STANDARD TERMS & CONDITIONS
            </span>
            <p className="text-[11px] leading-relaxed">
              1. All hardware units must match the 16GB DDR5 / 512GB SSD specification strictly.
            </p>
            <p className="text-[11px] leading-relaxed">
              2. Delivery must be fulfilled within 3 business days as per Vendor B quotation commitment.
            </p>
            <p className="text-[11px] leading-relaxed">
              3. Payment release against Net 30 Days post-inspection QA clearance.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>₹{po.totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Applicable GST (18%):</span>
              <span>₹{po.taxesGst.toLocaleString("en-IN")}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
              <span>Grand Total:</span>
              <span className="text-indigo-700">₹{po.grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Signatures / Authorization Seal */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">AI Verified & Approved</span>
              <span className="font-semibold text-slate-800">ProcureIQ Sourcing Engine</span>
            </div>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l sm:pl-6 border-slate-200 pt-2 sm:pt-0">
            <div className="font-mono text-[10px] text-slate-400">DIGITALLY SIGNED</div>
            <div className="font-bold text-slate-900 text-sm mt-0.5 font-serif italic">Deepak V.</div>
            <div className="text-[11px] text-slate-500 font-medium">{po.authorizedSignatory}</div>
          </div>
        </div>

        {/* Bottom Dispatch Button (Hidden in Print) */}
        <div className="print:hidden border-t border-slate-100 pt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">Status: {po.status} • Ready for Logistics Intake</span>

          <button
            id="btn-dispatch-po"
            onClick={handleDispatch}
            disabled={isDispatched}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isDispatched ? "DISPATCHED TO VENDOR B" : "DISPATCH PO TO VENDOR B"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
