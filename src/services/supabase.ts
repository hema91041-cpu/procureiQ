import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { RfqItem } from "../types";

const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : {};
const supabaseUrl = (metaEnv?.VITE_SUPABASE_URL || "").trim();
const supabaseAnonKey = (metaEnv?.VITE_SUPABASE_ANON_KEY || "").trim();

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.warn("Failed to initialize Supabase client:", err);
    }
  }
  return supabaseInstance;
}

export interface InsertRfqResult {
  success: boolean;
  rfqId: string;
  source: "supabase" | "local_store";
  error?: string;
  warning?: string;
}

export async function saveRfq(rfq: RfqItem): Promise<InsertRfqResult> {
  const client = getSupabaseClient();
  const rfqId = rfq.rfqNumber || `RFQ-${Date.now()}`;

  // Always save to localStorage as reliable backup
  try {
    const existing = localStorage.getItem("procureiq_rfqs");
    const rfqList: RfqItem[] = existing ? JSON.parse(existing) : [];
    const index = rfqList.findIndex((item) => item.rfqNumber === rfq.rfqNumber);
    if (index >= 0) {
      rfqList[index] = rfq;
    } else {
      rfqList.unshift(rfq);
    }
    localStorage.setItem("procureiq_rfqs", JSON.stringify(rfqList));
    localStorage.setItem("procureiq_active_rfq", JSON.stringify(rfq));
  } catch (e) {
    console.warn("LocalStorage save warning:", e);
  }

  if (client) {
    try {
      // Structure payload for Supabase rfqs table
      const dbPayload = {
        rfq_number: rfq.rfqNumber,
        product_name: rfq.productName,
        quantity: rfq.quantity,
        budget: rfq.budget,
        required_delivery_days: rfq.requiredDeliveryDays,
        specs: rfq.specs,
        status: rfq.status || "OPEN",
        created_at: new Date().toISOString(),
      };

      const { data, error } = await client
        .from("rfqs")
        .upsert(dbPayload, { onConflict: "rfq_number" })
        .select();

      if (error) {
        console.error("Supabase RFQ Insert Error:", error);
        return {
          success: false,
          rfqId,
          source: "supabase",
          error: `${error.message} (Code: ${error.code || "UNKNOWN"})`,
        };
      }

      return {
        success: true,
        rfqId,
        source: "supabase",
      };
    } catch (err: any) {
      console.error("Supabase Exception during RFQ insert:", err);
      return {
        success: false,
        rfqId,
        source: "supabase",
        error: err?.message || String(err),
      };
    }
  }

  // Supabase not configured in env
  return {
    success: true,
    rfqId,
    source: "local_store",
    warning: "Saved to ProcureIQ engine. Configure VITE_SUPABASE_URL in Settings if external cloud sync is desired.",
  };
}
