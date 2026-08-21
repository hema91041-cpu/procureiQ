import { RfqItem, VendorQuotation, NegotiationSuggestion } from "../types";
import { DEMO_NEGOTIATION } from "../data/mockData";

export async function requestAiAnalysis(rfq: RfqItem, vendors: VendorQuotation[]) {
  try {
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rfq, vendors }),
    });
    if (!res.ok) throw new Error("Server error");
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Using local AI analysis fallback:", err);
    return {
      mode: "deterministic_fallback",
      recommendation: "Vendor B",
      summary: "Vendor B delivers optimal Total Cost of Ownership with highest quality (95) and 3-day SLA compliance.",
    };
  }
}

export async function requestAiNegotiation(params: {
  vendorName: string;
  product: string;
  quantity: number;
  currentPrice: number;
  targetPrice: number;
}): Promise<NegotiationSuggestion["generatedEmailDraft"]> {
  try {
    const res = await fetch("/api/ai/negotiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error("Server error");
    const data = await res.json();
    if (data.emailSubject && data.emailBody) {
      return { subject: data.emailSubject, body: data.emailBody };
    }
    return DEMO_NEGOTIATION.generatedEmailDraft;
  } catch (err) {
    console.warn("Using local AI negotiation fallback:", err);
    return DEMO_NEGOTIATION.generatedEmailDraft;
  }
}
