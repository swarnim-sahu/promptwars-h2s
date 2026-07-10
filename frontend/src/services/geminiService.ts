import apiClient from './apiClient';
import type { AIResponse, DecisionHistory, AIMetric, AIStreamChunk } from '../types';

/**
 * Client service layer for future Google Gemini integration.
 * Makes HTTP calls to backend AI controller routes.
 */
class GeminiClientService {
  
  // 1. Analyze Crowd Data
  async analyzeCrowdData(gateData: Record<string, any>, crowdVelocity: Record<string, any>): Promise<AIResponse> {
    const res = await apiClient.post('/ai/analyze-crowd', { gateData, crowdVelocity });
    return res.data.data;
  }

  // 2. Generate Incident Summary
  async generateIncidentSummary(incidentLogs: string): Promise<AIResponse> {
    const res = await apiClient.post('/ai/summarize-incident', { incidentLogs });
    return res.data.data;
  }

  // 3. Generate Operational Recommendations
  async generateOperationalRecommendations(situation: string, resources: string): Promise<AIResponse> {
    const res = await apiClient.post('/ai/recommendations', { situation, resources });
    return res.data.data;
  }

  // 4. Generate Multilingual Announcement
  async generateMultilingualAnnouncement(context: string): Promise<AIResponse> {
    const res = await apiClient.post('/ai/announcement', { context });
    return res.data.data;
  }

  // 4b. Generate Multilingual Emergency Announcement
  async generateEmergencyAnnouncement(
    incidentType: string,
    location: string,
    severity: string,
    description: string,
    audience: string,
    tone: string
  ): Promise<AIResponse> {
    const res = await apiClient.post('/ai/generate-announcement', {
      incidentType,
      location,
      severity,
      description,
      audience,
      tone
    });
    return res.data.data;
  }

  // 5. Predict Crowd Risk
  async predictCrowdRisk(sensorData: Record<string, any>): Promise<AIResponse> {
    const res = await apiClient.post('/ai/predict-risk', { sensorData });
    return res.data.data;
  }

  // 6. CSV parsing and validation
  async parseCsvTelemetryFile(file: File, onUploadProgress?: (progressEvent: any) => void): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await apiClient.post('/ai/parse-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress
    });
    return res.data.data;
  }

  // 6b. Analyze statistics with Gemini AI
  async analyzeCsvTelemetryStats(stats: Record<string, any>): Promise<AIResponse> {
    const res = await apiClient.post('/ai/analyze-stats', { stats });
    return res.data.data;
  }

  // 7. Get Decision History
  async getDecisionHistory(): Promise<DecisionHistory[]> {
    const res = await apiClient.get('/ai/history');
    return res.data.data;
  }

  // 8. Save Decision Outcome status
  async saveDecisionOutcome(
    id: string, 
    accepted: boolean, 
    details?: { executionStatus?: DecisionHistory['executionStatus']; notes?: string; actualOutcome?: string }
  ): Promise<DecisionHistory> {
    const res = await apiClient.post(`/ai/history/${id}/outcome`, {
      accepted,
      ...details,
    });
    return res.data.data;
  }

  // 9. Fetch AI diagnostics usage metrics
  async getMetrics(): Promise<AIMetric[]> {
    const res = await apiClient.get('/ai/metrics');
    return res.data.data;
  }

  // 10. Future Streaming Support Interface Design
  // Exposes client API for reading SSE streaming chunks without changing components signature.
  streamRecommendations(
    situation: string,
    resources: string,
    onChunk: (chunk: AIStreamChunk) => void,
    onError: (err: any) => void
  ): () => void {
    console.log('Gemini Client: streamRecommendations stream initialized with parameters:', { situation, resources, onError });
    
    // In a production environment:
    // const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/ai/recommendations/stream?situation=${encodeURIComponent(situation)}`);
    // eventSource.onmessage = (e) => onChunk(JSON.parse(e.data));
    // eventSource.onerror = (e) => onError(e);
    // return () => eventSource.close();

    // Mock Client Streaming interval simulator
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count === 1) {
        onChunk({ text: "Compiling telemetry signals...", done: false });
      } else if (count === 2) {
        onChunk({ text: "Building prompt templates opsRecommendationPrompt_v1...", done: false });
      } else if (count === 3) {
        onChunk({ text: "Validating safety index against guardrails...", done: false });
      } else if (count === 4) {
        onChunk({ 
          text: "Recommendations generated.", 
          done: true, 
          metadata: {
            summary: "Gate B redirection active.",
            riskLevel: "Medium",
            confidence: 98,
            reasoning: ["Turnstile bottlenecks present."],
            recommendedActions: ["Reroute to Gate A."],
            expectedImpact: "Egress load reduced by 40%.",
            announcement: { english: "Use Gate A", spanish: "Use Puerta A", french: "Use Porte A" }
          }
        });
        clearInterval(interval);
      }
    }, 1000);

    // Return cancellation handler function (cleanup)
    return () => {
      console.log('Gemini Client: stream aborted.');
      clearInterval(interval);
    };
  }
}

export const geminiService = new GeminiClientService();
