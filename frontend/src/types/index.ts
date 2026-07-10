export type ThemeMode = 'light' | 'dark';

export type UserRole = 'fan' | 'organizer' | 'volunteer' | 'emergency';

export interface AppState {
  theme: ThemeMode;
  role: UserRole;
  setTheme: (theme: ThemeMode) => void;
  setRole: (role: UserRole) => void;
}

export interface StadiumAlert {
  id: string;
  level: 'info' | 'warning' | 'danger';
  message: string;
  timestamp: string;
  location: string;
}

export interface AIServiceResponse {
  success: boolean;
  text: string;
  metadata?: Record<string, any>;
}

export interface IAIService {
  analyzeCrowdDensity(imageBuffer: ArrayBuffer | string): Promise<AIServiceResponse>;
  optimizeTrafficFlow(sensorData: Record<string, any>): Promise<AIServiceResponse>;
  respondToEmergency(alert: StadiumAlert): Promise<AIServiceResponse>;
  chatWithAssistant(message: string, context?: Record<string, any>): Promise<AIServiceResponse>;
}

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
  executionTime: number;
  responseSize: number;
  promptVersion: string;
  requestType: string;
  success: boolean;
}

export interface AIStreamChunk {
  text: string;
  done: boolean;
  metadata?: Partial<AIResponse>;
}

