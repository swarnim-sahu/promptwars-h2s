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

export interface GateTelemetry {
  [gateName: string]: number | undefined;
}

export interface CrowdVelocity {
  [gateName: string]: number | undefined;
}

export interface TelemetryRecord {
  timestamp: string;
  gate: string;
  occupancy: number;
  entryRate: number;
  weather: string;
  volunteers: number;
  medicalIncidents: number;
}

export interface ParsedTelemetryStats {
  totalRecords: number;
  averageOccupancy: number;
  maxOccupancy: number;
  maxOccupancyGate: string;
  averageEntryRate: number;
  totalMedical: number;
  totalVolunteers: number;
  uniqueGates: string[];
  weatherSummary: string;
  congestedGates: string[];
}
