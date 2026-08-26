export interface Case {
  id: string;
  title: string;
  description: string;
  as_of_date: string;
  jurisdiction: "INDIA" | "INTERNATIONAL" | "BOTH";
  status: "pending" | "analyzed" | "escalated";
  confidence_score?: number;
  created_at: string;
}

export interface CreateCasePayload {
  title: string;
  description: string;
  as_of_date: string;
  jurisdiction: "INDIA" | "INTERNATIONAL" | "BOTH";
}

export interface Fact {
  id: string;
  key: string;
  value: any;
  source_span: string;
  extraction_confidence: number;
  user_corrected: boolean;
}
