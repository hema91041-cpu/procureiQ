export type AppTab =
  | "dashboard"
  | "create-rfq"
  | "quotations"
  | "ai-extraction"
  | "vendor-comparison"
  | "risk-radar"
  | "recommendation"
  | "negotiation"
  | "purchase-order";

export interface RfqSpecs {
  ram: string; // e.g. "16GB RAM"
  cpu: string; // e.g. "Intel i5"
  storage: string; // e.g. "512GB SSD"
}

export interface RfqItem {
  id: string;
  rfqNumber: string;
  productName: string;
  quantity: number;
  budget: number; // in INR
  requiredDeliveryDays: number;
  specs: RfqSpecs;
  status: "DRAFT" | "OPEN" | "QUOTATIONS_RECEIVED" | "ANALYZED" | "PO_ISSUED";
  createdAt: string;
}

export interface VendorQuotation {
  id: string;
  vendorId: string;
  vendorName: string;
  companyName: string;
  contactEmail: string;
  unitPrice: number;
  totalPrice: number;
  deliveryDays: number;
  warrantyYears: number;
  qualityScore: number; // 0 - 100
  specs: {
    ram: string;
    ramGb: number;
    cpu: string;
    storage: string;
  };
  paymentTermsDays: number;
  isCompliant: boolean;
  score: number; // e.g. Vendor A: 84, Vendor B: 92, Vendor C: 72
  scoreBreakdown: {
    priceScore: number;
    qualityScore: number;
    deliveryScore: number;
    warrantyScore: number;
    paymentScore: number;
    riskPenalty: number;
  };
  keyStrengths: string[];
  keyRisks: string[];
  rawDocumentSnippet: string;
}

export type RiskSeverity = "HIGH" | "MEDIUM" | "LOW";

export interface RiskItem {
  id: string;
  riskCode: string;
  title: string;
  vendorName: string;
  severity: RiskSeverity;
  category: "SPECIFICATION" | "DELIVERY" | "PRICE_ANOMALY" | "WARRANTY" | "FINANCIAL";
  requiredValue: string;
  quotedValue: string;
  description: string;
  businessImpact: string;
  mitigationAction: string;
}

export interface PurchaseOrder {
  poNumber: string;
  rfqNumber: string;
  vendorName: string;
  vendorAddress: string;
  vendorEmail: string;
  vendorGst: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxesGst: number;
  grandTotal: number;
  deliveryTimelineDays: number;
  warrantyYears: number;
  specs: RfqSpecs;
  paymentTerms: string;
  status: "DRAFT" | "APPROVED" | "ISSUED";
  issuedDate: string;
  authorizedSignatory: string;
}

export interface NegotiationSuggestion {
  vendorName: string;
  currentPrice: number;
  targetPriceRange: {
    min: number;
    max: number;
  };
  potentialSavings: number;
  leveragePoints: {
    title: string;
    description: string;
    impact: string;
  }[];
  generatedEmailDraft: {
    subject: string;
    body: string;
  };
}

export interface ErpSnapshot {
  inventory: {
    currentStock: number;
    incoming: number;
    projectedStock: number;
    unit: string;
  };
  finance: {
    totalBudget: number;
    selectedProcurement: number;
    remainingBudget: number;
    variancePercent: number;
  };
}
