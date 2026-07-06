export interface AIServiceResponse {
  success: boolean;
  text: string;
  metadata?: Record<string, any>;
}

export interface StadiumAlert {
  id: string;
  level: 'info' | 'warning' | 'danger';
  message: string;
  timestamp: string;
  location: string;
}

export interface IAIService {
  generateResponse(prompt: string, context?: Record<string, any>): Promise<AIServiceResponse>;
  analyzeCrowdSafety(cameraFeedUrl: string): Promise<AIServiceResponse>;
}
