import { RfqItem, VendorQuotation, RiskItem, PurchaseOrder, NegotiationSuggestion, ErpSnapshot } from "../types";

export const DEFAULT_RFQ: RfqItem = {
  id: "rfq-laptop-2026-001",
  rfqNumber: "RFQ-2026-089",
  productName: "Enterprise Laptop",
  quantity: 100,
  budget: 5000000, // ₹50,00,000
  requiredDeliveryDays: 7,
  specs: {
    ram: "16GB DDR5 RAM",
    cpu: "Intel Core i5 (13th Gen / Ultra)",
    storage: "512GB NVMe SSD",
  },
  status: "ANALYZED",
  createdAt: "2026-08-20",
};

export const DEMO_VENDORS: VendorQuotation[] = [
  {
    id: "quot-vendor-a",
    vendorId: "VEND-A",
    vendorName: "Vendor A",
    companyName: "Apex Tech Infotech Pvt Ltd",
    contactEmail: "sales@apextech.in",
    unitPrice: 45000,
    totalPrice: 4500000,
    deliveryDays: 7,
    warrantyYears: 1,
    qualityScore: 85,
    specs: {
      ram: "16GB RAM",
      ramGb: 16,
      cpu: "Intel i5 13th Gen",
      storage: "512GB SSD",
    },
    paymentTermsDays: 30,
    isCompliant: true,
    score: 84,
    scoreBreakdown: {
      priceScore: 23,
      qualityScore: 26,
      deliveryScore: 18,
      warrantyScore: 7,
      paymentScore: 10,
      riskPenalty: 0,
    },
    keyStrengths: [
      "Exact on-time 7-day delivery matching requirement",
      "Full specification compliance (16GB RAM / 512GB SSD)",
      "Standard Net 30 corporate payment terms",
    ],
    keyRisks: [
      "Only 1-year standard warranty (standard coverage)",
      "Medium tier QA rating compared to premier suppliers",
    ],
    rawDocumentSnippet: `QUOTATION #QT-APX-4491
To: ProcureIQ Sourcing Directorate
Item: Enterprise Workstation Laptop (100 Qty)
Specifications: 16GB DDR5, Intel Core i5, 512GB PCIe Gen4 SSD
Unit Rate: ₹45,000 INR
Delivery Lead Time: 7 Days Ex-Works
Warranty: 1 Year Comprehensive Onsite
Payment Terms: 30 Days Credit from Delivery
QA Inspection Index: 85/100`,
  },
  {
    id: "quot-vendor-b",
    vendorId: "VEND-B",
    vendorName: "Vendor B",
    companyName: "BluePeak Systems & Technologies",
    contactEmail: "enterprise@bluepeaksys.com",
    unitPrice: 47000,
    totalPrice: 4700000,
    deliveryDays: 3,
    warrantyYears: 3,
    qualityScore: 95,
    specs: {
      ram: "16GB RAM",
      ramGb: 16,
      cpu: "Intel i5 13th Gen",
      storage: "512GB SSD",
    },
    paymentTermsDays: 30,
    isCompliant: true,
    score: 92,
    scoreBreakdown: {
      priceScore: 21,
      qualityScore: 29,
      deliveryScore: 20,
      warrantyScore: 12,
      paymentScore: 10,
      riskPenalty: 0,
    },
    keyStrengths: [
      "Fastest Delivery: 3 days (4 days ahead of 7-day SLA)",
      "Longest Warranty: 3-year comprehensive OEM warranty",
      "Highest Quality Score: 95/100 tier-1 hardware testing",
      "Full specification compliance and Net 30 payment terms",
    ],
    keyRisks: [
      "Unit price is ₹2,000 higher than Vendor A, but offset by ₹12,000+ extended warranty & TCO value",
    ],
    rawDocumentSnippet: `QUOTATION #BP-2026-OCT-88
To: ProcureIQ Sourcing Directorate
Item: Enterprise Laptop Tier-1 Grade (100 Qty)
Specifications: 16GB High-Speed RAM, Intel i5 Processor, 512GB SSD
Unit Rate: ₹47,000 INR
Delivery Lead Time: 3 Days Express Delivery (In-Stock)
Warranty: 3 Years Extended OEM Full Coverage
Payment Terms: 30 Days Net
Quality Index: 95/100 (ISO 9001 Certified)`,
  },
  {
    id: "quot-vendor-c",
    vendorId: "VEND-C",
    vendorName: "Vendor C",
    companyName: "CyberPulse Hardware Logistics",
    contactEmail: "orders@cyberpulsehw.net",
    unitPrice: 42000,
    totalPrice: 4200000,
    deliveryDays: 20,
    warrantyYears: 1,
    qualityScore: 78,
    specs: {
      ram: "8GB RAM", // MISMATCH!
      ramGb: 8,
      cpu: "Intel i5 12th Gen",
      storage: "512GB SSD",
    },
    paymentTermsDays: 15,
    isCompliant: false,
    score: 72,
    scoreBreakdown: {
      priceScore: 25,
      qualityScore: 20,
      deliveryScore: 8,
      warrantyScore: 7,
      paymentScore: 7,
      riskPenalty: -15, // Severe penalty for spec failure + 20-day delay
    },
    keyStrengths: [
      "Lowest headline unit price (₹42,000 per unit)",
    ],
    keyRisks: [
      "CRITICAL: 8GB RAM violates mandatory 16GB specification requirement",
      "CRITICAL: 20-day delivery timeline delays rollout by 13 days past 7-day SLA",
      "Short 15-day payment terms creates working capital friction",
      "Lowest quality index (78/100)",
    ],
    rawDocumentSnippet: `QUOTATION #CP-9901-LPT
To: ProcureIQ Sourcing Directorate
Item: Commercial Grade Laptop (100 Qty)
Specifications: 8GB RAM [NOTE: Budget configuration], Intel i5, 512GB SSD
Unit Rate: ₹42,000 INR (Special Clearance)
Delivery Lead Time: 20 Days Sea-Freight/Backorder
Warranty: 1 Year Limited
Payment Terms: 15 Days Advance/Net`,
  },
];

export const DEMO_RISKS: RiskItem[] = [
  {
    id: "risk-01",
    riskCode: "RSK-SPEC-001",
    title: "Specification Mismatch (RAM Capacity)",
    vendorName: "Vendor C",
    severity: "HIGH",
    category: "SPECIFICATION",
    requiredValue: "16GB RAM",
    quotedValue: "8GB RAM",
    description: "Vendor C submitted 8GB RAM configuration instead of the mandatory 16GB enterprise requirement.",
    businessImpact: "Will cause severe multitasking bottlenecks, system slowdowns for corporate software, and necessitate costly post-purchase RAM upgrades (approx ₹4,500/unit).",
    mitigationAction: "Disqualify from automated award or issue mandatory technical amendment notice.",
  },
  {
    id: "risk-02",
    riskCode: "RSK-DELIV-002",
    title: "Delivery SLA Breach (20 Days vs 7 Days)",
    vendorName: "Vendor C",
    severity: "HIGH",
    category: "DELIVERY",
    requiredValue: "7 Days Delivery",
    quotedValue: "20 Days Lead Time",
    description: "Quoted lead time of 20 days exceeds project deployment deadline by 13 business days.",
    businessImpact: "Halts enterprise employee onboarding and causes downstream operational downtime.",
    mitigationAction: "Reject quotation due to inability to meet urgent project deployment schedule.",
  },
  {
    id: "risk-03",
    riskCode: "RSK-PRICE-003",
    title: "Low Price Anomaly / Specification Dilution Alert",
    vendorName: "Vendor C",
    severity: "MEDIUM",
    category: "PRICE_ANOMALY",
    requiredValue: "Market Range: ₹45K - ₹47K",
    quotedValue: "₹42,000 (Outlier Low)",
    description: "Low price detected — verify specification and terms. Price is ~11% below median vendor submissions.",
    businessImpact: "Underpriced bid is directly linked to substandard 8GB RAM and older generation component batches.",
    mitigationAction: "Enforce strict AI Spec Verification — demonstrates that Cheapest ≠ Best.",
  },
  {
    id: "risk-04",
    riskCode: "RSK-TERM-004",
    title: "Compressed Payment Terms Friction",
    vendorName: "Vendor C",
    severity: "LOW",
    category: "FINANCIAL",
    requiredValue: "30 Days Net Terms",
    quotedValue: "15 Days Payment Terms",
    description: "Vendor C demands payment settlement within 15 days of dispatch.",
    businessImpact: "Reduces working capital flexibility for accounts payable.",
    mitigationAction: "Standardize on 30-day payment terms.",
  },
];

export const DEMO_NEGOTIATION: NegotiationSuggestion = {
  vendorName: "Vendor B",
  currentPrice: 47000,
  targetPriceRange: {
    min: 45500,
    max: 46000,
  },
  potentialSavings: 150000, // ₹1,50,000 for 100 units
  leveragePoints: [
    {
      title: "Volume Commitment Leverage (100 Units)",
      description: "Use bulk purchase order commitment of 100 units to request a 2.5% - 3.2% volume discount (Target: ₹45,800).",
      impact: "Saves up to ₹1,20,000 while maintaining priority allocation.",
    },
    {
      title: "Competitive Benchmark Counter",
      description: "Politely reference qualified benchmark rate of ₹45,000 from compliant alternate suppliers while affirming preference for Vendor B's 3-year warranty.",
      impact: "Provides commercial justification for Vendor B's account director to authorize discount.",
    },
    {
      title: "Written 3-Day SLA & Penalty Clause",
      description: "Confirm explicit SLA penalty terms for each day beyond the committed 3-day express turnaround.",
      impact: "Guarantees mission-critical delivery without late risks.",
    },
    {
      title: "Lock In Net 30 Days Terms",
      description: "Solidify Net 30 post-delivery inspection clearance to preserve working capital cashflow.",
      impact: "Aligns with enterprise treasury standards.",
    },
  ],
  generatedEmailDraft: {
    subject: "Procurement Order Finalization: RFQ-2026-089 Laptop (100 Units) — Target Rate Confirmation",
    body: `Dear BluePeak Systems (Vendor B) Key Account Management,

We have completed the AI Evaluation for RFQ-2026-089 (100 Units Enterprise Laptops).

We are pleased to inform you that Vendor B has achieved our highest overall recommendation score (92/100), specifically recognized for your 3-Year Comprehensive Warranty and 3-Day Express Delivery SLA.

To proceed with immediate Purchase Order issuance (PO-00124), we invite you to adjust the unit rate to our volume target of ₹45,800 / unit (total ₹45,80,000 + GST).

Terms for Immediate PO Release:
• Quantity: 100 Units (16GB RAM / Intel i5 / 512GB SSD)
• Warranty: 3 Years Onsite Comprehensive
• Delivery SLA: 3 Business Days from PO release
• Payment Terms: Net 30 Days upon QA acceptance

Please confirm your acceptance so we can dispatch the signed Purchase Order today.

Best regards,
ProcureIQ Strategic Sourcing Directorate
Team CYBERHACKZ — AION 2026`,
  },
};

export const DEMO_PO: PurchaseOrder = {
  poNumber: "PO-00124",
  rfqNumber: "RFQ-2026-089",
  vendorName: "Vendor B (BluePeak Systems & Technologies)",
  vendorAddress: "Tech Hub Tower 4, Electronics City, Bengaluru - 560100",
  vendorEmail: "enterprise@bluepeaksys.com",
  vendorGst: "29AAAAA1234A1Z5",
  productName: "Enterprise Laptop (16GB RAM / Intel i5 / 512GB SSD)",
  quantity: 100,
  unitPrice: 47000,
  totalPrice: 4700000,
  taxesGst: 846000, // 18% GST = ₹8,46,000
  grandTotal: 5546000,
  deliveryTimelineDays: 3,
  warrantyYears: 3,
  specs: {
    ram: "16GB High-Speed DDR5 RAM",
    cpu: "Intel Core i5 (13th Gen Enterprise)",
    storage: "512GB M.2 NVMe SSD",
  },
  paymentTerms: "30 Days Credit post-delivery verification",
  status: "APPROVED",
  issuedDate: "2026-08-20",
  authorizedSignatory: "Chief Procurement Officer, ProcureIQ Enterprise",
};

export const DEMO_ERP: ErpSnapshot = {
  inventory: {
    currentStock: 120,
    incoming: 100,
    projectedStock: 220,
    unit: "Units",
  },
  finance: {
    totalBudget: 5000000,
    selectedProcurement: 4700000,
    remainingBudget: 300000,
    variancePercent: 6.0,
  },
};

// Calculate dynamic score based on transparent weighted formula
export function calculateVendorScore(
  vendor: {
    unitPrice: number;
    deliveryDays: number;
    warrantyYears: number;
    qualityScore: number;
    ramGb: number;
    paymentTermsDays: number;
  },
  rfq: {
    budget: number;
    quantity: number;
    requiredDeliveryDays: number;
    requiredRamGb: number;
  }
) {
  const maxBudgetPerUnit = rfq.budget / rfq.quantity;
  
  // Price factor (Max 25 pts): Cheaper gets more points relative to budget
  const priceRatio = (maxBudgetPerUnit - vendor.unitPrice) / maxBudgetPerUnit;
  const priceScore = Math.min(25, Math.max(10, Math.round(18 + priceRatio * 20)));

  // Quality factor (Max 30 pts): Directly scales with quality score (0-100)
  const qualityScore = Math.round((vendor.qualityScore / 100) * 30);

  // Delivery factor (Max 20 pts): Faster delivery gets high score, exceeding SLA loses points
  let deliveryScore = 15;
  if (vendor.deliveryDays <= 3) deliveryScore = 20;
  else if (vendor.deliveryDays <= rfq.requiredDeliveryDays) deliveryScore = 18;
  else deliveryScore = Math.max(5, 18 - (vendor.deliveryDays - rfq.requiredDeliveryDays) * 1.5);

  // Warranty factor (Max 15 pts): 3 years gives 12-15 pts, 1 year gives 7 pts
  const warrantyScore = vendor.warrantyYears >= 3 ? 12 : 7;

  // Payment terms (Max 10 pts): 30 days gives 10 pts, 15 days gives 7 pts
  const paymentScore = vendor.paymentTermsDays >= 30 ? 10 : 7;

  // Risk Penalty
  let riskPenalty = 0;
  if (vendor.ramGb < rfq.requiredRamGb) {
    riskPenalty -= 15; // Critical failure for spec mismatch
  }
  if (vendor.deliveryDays > rfq.requiredDeliveryDays) {
    riskPenalty -= 5;
  }

  const totalScore = Math.max(0, Math.min(100, priceScore + qualityScore + deliveryScore + warrantyScore + paymentScore + riskPenalty));

  return {
    totalScore,
    priceScore,
    qualityScore,
    deliveryScore,
    warrantyScore,
    paymentScore,
    riskPenalty,
  };
}
