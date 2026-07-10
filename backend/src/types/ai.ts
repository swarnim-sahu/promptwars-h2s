export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MultilingualAnnouncement {
  english: string;
  spanish: string;
  french: string;
}

export interface AIResponse {
  summary: string;
  riskLevel: RiskLevel;
  confidence: number;
  reasoning: string[];
  recommendedActions: string[];
  expectedImpact: string;
  announcement?: MultilingualAnnouncement;
  estimatedQueueReduction?: string;
  priority?: 'Low' | 'Medium' | 'High';
  analysisTimestamp?: string;
  analysisId?: string;
}

export interface DecisionHistory {
  id: string;
  timestamp: string;
  situationSummary: string;
  aiRecommendation: string;
  confidence: number;
  reasoning: string;
  accepted: boolean | null;
  executionStatus: 'Pending' | 'Executed' | 'Cancelled';
  estimatedImpact: string;
  actualOutcome?: string;
  organizerNotes?: string;
}

export interface AIMetric {
  timestamp: string;
  executionTime: number; // milliseconds
  responseSize: number; // bytes
  promptVersion: string;
  requestType: string;
  success: boolean;
}

// Future Streaming Support Interfaces
export interface AIStreamChunk {
  text: string;
  done: boolean;
  metadata?: Partial<AIResponse>;
}
