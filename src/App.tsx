/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppTab, RfqItem, VendorQuotation, RiskItem, PurchaseOrder, NegotiationSuggestion, ErpSnapshot } from "./types";
import {
  DEFAULT_RFQ,
  DEMO_VENDORS,
  DEMO_RISKS,
  DEMO_NEGOTIATION,
  DEMO_PO,
  DEMO_ERP,
} from "./data/mockData";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardView } from "./components/DashboardView";
import { CreateRfqView } from "./components/CreateRfqView";
import { QuotationsView } from "./components/QuotationsView";
import { AiExtractionView } from "./components/AiExtractionView";
import { ComparisonView } from "./components/ComparisonView";
import { RiskRadarView } from "./components/RiskRadarView";
import { RecommendationView } from "./components/RecommendationView";
import { NegotiationView } from "./components/NegotiationView";
import { PurchaseOrderView } from "./components/PurchaseOrderView";
import { DemoTourModal } from "./components/DemoTourModal";

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>("dashboard");
  const [activeRfq, setActiveRfq] = useState<RfqItem>(DEFAULT_RFQ);
  const [vendors, setVendors] = useState<VendorQuotation[]>(DEMO_VENDORS);
  const [risks, setRisks] = useState<RiskItem[]>(DEMO_RISKS);
  const [negotiation, setNegotiation] = useState<NegotiationSuggestion>(DEMO_NEGOTIATION);
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(DEMO_PO);
  const [erp, setErp] = useState<ErpSnapshot>(DEMO_ERP);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Reload demo dataset handler
  const handleReloadDemo = () => {
    setActiveRfq(DEFAULT_RFQ);
    setVendors(DEMO_VENDORS);
    setRisks(DEMO_RISKS);
    setNegotiation(DEMO_NEGOTIATION);
    setPurchaseOrder(DEMO_PO);
    setErp(DEMO_ERP);
  };

  // Update RFQ and propagate to downstream evaluations
  const handleSaveRfq = (updatedRfq: RfqItem) => {
    setActiveRfq(updatedRfq);
    // Dynamically synchronize vendor totals with new batch quantity
    setVendors((prevVendors) =>
      prevVendors.map((v) => ({
        ...v,
        totalPrice: v.unitPrice * updatedRfq.quantity,
      }))
    );
    // Update Purchase Order template
    setPurchaseOrder((prevPo) => {
      const selectedUnit = prevPo.unitPrice || 47000;
      const subtotal = selectedUnit * updatedRfq.quantity;
      return {
        ...prevPo,
        rfqNumber: updatedRfq.rfqNumber,
        productName: updatedRfq.productName,
        quantity: updatedRfq.quantity,
        totalPrice: subtotal,
        taxesGst: Math.round(subtotal * 0.18),
        grandTotal: Math.round(subtotal * 1.18),
        specs: { ...updatedRfq.specs },
      };
    });
    // Update ERP inventory and budget
    setErp((prevErp) => ({
      ...prevErp,
      inventory: {
        ...prevErp.inventory,
        incoming: updatedRfq.quantity,
        projectedStock: prevErp.inventory.currentStock + updatedRfq.quantity,
      },
      finance: {
        ...prevErp.finance,
        totalBudget: updatedRfq.budget,
        remainingBudget: updatedRfq.budget - prevErp.finance.selectedProcurement,
        variancePercent: Number(
          (
            ((updatedRfq.budget - prevErp.finance.selectedProcurement) / (updatedRfq.budget || 1)) *
            100
          ).toFixed(1)
        ),
      },
    }));
  };

  // Vendor approval handler
  const handleApproveVendor = (selectedVendor: VendorQuotation) => {
    const updatedPo: PurchaseOrder = {
      ...purchaseOrder,
      vendorName: `${selectedVendor.vendorName} (${selectedVendor.companyName})`,
      vendorEmail: selectedVendor.contactEmail,
      unitPrice: selectedVendor.unitPrice,
      totalPrice: selectedVendor.totalPrice,
      taxesGst: Math.round(selectedVendor.totalPrice * 0.18),
      grandTotal: Math.round(selectedVendor.totalPrice * 1.18),
      deliveryTimelineDays: selectedVendor.deliveryDays,
      warrantyYears: selectedVendor.warrantyYears,
      status: "APPROVED",
    };
    setPurchaseOrder(updatedPo);

    const updatedErp: ErpSnapshot = {
      inventory: {
        currentStock: 120,
        incoming: activeRfq.quantity,
        projectedStock: 120 + activeRfq.quantity,
        unit: "Units",
      },
      finance: {
        totalBudget: activeRfq.budget,
        selectedProcurement: selectedVendor.totalPrice,
        remainingBudget: activeRfq.budget - selectedVendor.totalPrice,
        variancePercent: Number(
          (((activeRfq.budget - selectedVendor.totalPrice) / activeRfq.budget) * 100).toFixed(1)
        ),
      },
    };
    setErp(updatedErp);
  };

  const vendorB = vendors.find((v) => v.vendorId === "VEND-B") || vendors[1];

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 font-sans antialiased overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenDemoMode={() => setIsDemoModalOpen(true)}
        quotationCount={vendors.length}
        riskCount={risks.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky Top Header */}
        <Header
          activeRfq={activeRfq}
          onResetDemo={handleReloadDemo}
          onOpenDemoMode={() => setIsDemoModalOpen(true)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-300">
          {currentTab === "dashboard" && (
            <DashboardView
              activeRfq={activeRfq}
              vendors={vendors}
              risks={risks}
              erp={erp}
              onNavigate={setCurrentTab}
              onOpenDemoMode={() => setIsDemoModalOpen(true)}
            />
          )}

          {currentTab === "create-rfq" && (
            <CreateRfqView
              activeRfq={activeRfq}
              onSaveRfq={handleSaveRfq}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === "quotations" && (
            <QuotationsView
              vendors={vendors}
              onReloadDemo={handleReloadDemo}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === "ai-extraction" && (
            <AiExtractionView
              vendors={vendors}
              activeRfq={activeRfq}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === "vendor-comparison" && (
            <ComparisonView
              vendors={vendors}
              activeRfq={activeRfq}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === "risk-radar" && (
            <RiskRadarView risks={risks} onNavigate={setCurrentTab} />
          )}

          {currentTab === "recommendation" && (
            <RecommendationView
              vendors={vendors}
              activeRfq={activeRfq}
              onNavigate={setCurrentTab}
              onApproveVendor={handleApproveVendor}
            />
          )}

          {currentTab === "negotiation" && (
            <NegotiationView
              negotiation={negotiation}
              vendorB={vendorB}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === "purchase-order" && (
            <PurchaseOrderView
              po={purchaseOrder}
              vendorB={vendorB}
              activeRfq={activeRfq}
            />
          )}
        </main>
      </div>

      {/* Guided 2-Minute Hackathon Demo Controller Modal */}
      <DemoTourModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateTab={setCurrentTab}
      />
    </div>
  );
}
