import { GoogleGenAI } from '@google/genai';
import { geminiConfig } from '../config/gemini';
import { AIResponse, AIMetric, DecisionHistory, AIStreamChunk } from '../types/ai';
import { validateAIResponse, getSafeFallback } from './responseValidator';
import { mockAIResponse, mockMetrics, mockDecisionHistory } from '../shared/mockAIData';
import {
  crowdRiskPrompt_v1,
  opsRecommendationPrompt_v1,
  incidentSummaryPrompt_v1,
  announcementPrompt_v1,
  translationPrompt_v1,
  csvAnalysisPrompt_v1,
} from './promptBuilder';

// Mock Databases in-memory
const metricsDatabase: AIMetric[] = [...mockMetrics];
const decisionsDatabase: DecisionHistory[] = [...mockDecisionHistory];

/**
 * Gemini Orchestration Service.
 * Implements the prompt builders, response guardrail checks, analytics metrics tracking, 
 * request timeout handling, transient retries, and Google Gemini API SDK queries.
 */
class GeminiService {
  private ai: GoogleGenAI | null = null;
  private modelName: string;

  constructor() {
    this.modelName = geminiConfig.defaultModel || 'gemini-2.5-flash';
    const apiKey = process.env.GEMINI_API_KEY || geminiConfig.apiKey;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn("Gemini API Key is not set. Google GenAI calls will fall back to local simulation.");
    }
  }

  // Helper method executing calls to Gemini with timeout and retry controls
  private async executeGeminiCallWithRetryAndTimeout(prompt: string, timeoutMs: number = 15000): Promise<string> {
    if (!this.ai) {
      throw new Error("Gemini API client is not initialized. Please verify GEMINI_API_KEY env variable.");
    }

    const makeCall = async () => {
      return await this.ai!.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: geminiConfig.generationConfig.temperature,
          safetySettings: geminiConfig.safetySettings as any,
        }
      });
    };

    // Timeout Promise Cap
    const timeoutPromise = new Promise<never>((_, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("Gemini API request timed out after 15 seconds."));
      }, timeoutMs);
      timer.unref?.();
    });

    // Execute with 1 retry (exponential backoff) for transient errors
    let attempts = 0;
    const maxAttempts = 2; // Original + 1 Retry

    while (attempts < maxAttempts) {
      try {
        attempts++;
        const response = await Promise.race([makeCall(), timeoutPromise]);
        return response.text || '';
      } catch (err: any) {
        const isAuthError = err.status === 401 || err.status === 403 || err.message?.includes('API_KEY_INVALID') || err.message?.includes('API key');
        const isTimeout = err.message?.includes('timed out');

        // Do not retry on auth errors, timeouts, or maximum attempts reached
        if (isAuthError || isTimeout || attempts >= maxAttempts) {
          throw err;
        }

        // Exponential backoff delay
        const delay = 1000 * Math.pow(2, attempts - 1);
        console.warn(`[Gemini Service] Transient error on attempt ${attempts}. Retrying in ${delay}ms. Error:`, err.message);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error("Max API call attempts reached without success.");
  }

  // Verify connectivity health diagnostics
  async verifyConnectivity(): Promise<{ success: boolean; message: string; model?: string }> {
    const startTime = Date.now();
    console.log(`[Gemini Health Check] Handshake started. Selected model: ${this.modelName}`);

    if (!this.ai) {
      console.error("[Gemini Health Check] API key is missing from environment variables.");
      return { success: false, message: "API key is missing from environment variables." };
    }

    try {
      // Race the lightweight connectivity test call with a 20-second timeout
      const result = await Promise.race([
        this.ai.models.generateContent({
          model: this.modelName,
          contents: "Ping check. Respond with 'pong'.",
          config: {
            maxOutputTokens: 10,
            temperature: 0.0,
          }
        }),
        new Promise<never>((_, reject) => {
          const timer = setTimeout(() => reject(new Error("Timeout")), 20000);
          timer.unref?.();
        })
      ]);

      const text = result.text?.trim();
      const elapsed = Date.now() - startTime;
      console.log(`[Gemini Health Check] Handshake completed. Elapsed: ${elapsed}ms. Response: "${text}"`);

      if (text && text.length > 0) {
        return { 
          success: true, 
          message: `Gemini API connectivity verified. Handshake completed in ${elapsed}ms.`, 
          model: this.modelName 
        };
      } else {
        console.warn("[Gemini Health Check] Handshake completed but returned empty content.");
        return { 
          success: false, 
          message: "API responded with empty body content.", 
          model: this.modelName 
        };
      }
    } catch (err: any) {
      const elapsed = Date.now() - startTime;
      console.error(`[Gemini Health Check] Handshake failed. Elapsed: ${elapsed}ms. SDK Error:`, err.stack || err.message);
      return { 
        success: false, 
        message: `Handshake failed: ${err.message}`, 
        model: this.modelName 
      };
    }
  }
  
  // Track AI Usage analytics mock records
  private logMetric(requestType: string, promptVersion: string, startTime: number, success: boolean, size: number) {
    const metric: AIMetric = {
      timestamp: new Date().toISOString(),
      //@ts-ignore - compatibility with earlier types
      executionTime: Date.now() - startTime,
      responseSize: size,
      promptVersion,
      requestType,
      success,
    };
    metricsDatabase.push(metric);
  }

  // 1. Analyze Crowd Data (Real Gemini SDK Integration)
  async analyzeCrowdData(gateData: any, crowdVelocity: any): Promise<AIResponse> {
    const startTime = Date.now();
    const combinedData = {
      ...gateData,
      ...(crowdVelocity && Object.keys(crowdVelocity).length > 0 ? { crowdVelocity } : {})
    };
    const prompt = crowdRiskPrompt_v1(JSON.stringify(combinedData));
    const promptVersion = 'crowdRiskPrompt_v1';
    
    let validatedData: AIResponse;
    let success = false;
    let responseText = '';

    try {
      // Execute the Gemini call using our wrapper containing timeout and retry protections
      responseText = await this.executeGeminiCallWithRetryAndTimeout(prompt);
      
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr: any) {
        throw new Error(`Failed to parse Gemini response as JSON: ${parseErr.message}`);
      }

      const validation = validateAIResponse(parsed);
      validatedData = validation.data;
      success = validation.valid;

    } catch (error: any) {
      console.error('[Gemini Service Error] analyzeCrowdData execution failed:', error.stack || error.message);
      
      // Safety operational fallback in case of errors/validation failure
      validatedData = getSafeFallback(`Gemini execution failure: ${error.message}`);
      success = false;
      responseText = JSON.stringify(validatedData);
    }

    this.logMetric(
      'Crowd Data Analysis',
      promptVersion,
      startTime,
      success,
      responseText.length
    );

    return validatedData;
  }

  // 2. Generate Incident Summary (Simulation/Sandbox)
  async generateIncidentSummary(incidentLogs: any): Promise<AIResponse> {
    const startTime = Date.now();
    const prompt = incidentSummaryPrompt_v1(JSON.stringify(incidentLogs));
    const promptVersion = 'incidentSummaryPrompt_v1';

    const simulatedPayload = {
      ...mockAIResponse,
      summary: `Summarized active medical logs: Incident Section 108 Row K paramedic dispatched for heat exhaustion. Status check: stable.`,
      riskLevel: 'Medium',
    };
    const validation = validateAIResponse(simulatedPayload);

    this.logMetric(
      'Incident Summarization',
      promptVersion,
      startTime,
      validation.valid,
      JSON.stringify(validation.data).length
    );

    return validation.data;
  }

  // 3. Generate Operational Recommendations (Simulation/Sandbox)
  async generateOperationalRecommendations(situation: string, resources: string): Promise<AIResponse> {
    const startTime = Date.now();
    const prompt = opsRecommendationPrompt_v1(situation, resources);
    const promptVersion = 'opsRecommendationPrompt_v1';

    const simulatedPayload = { ...mockAIResponse };
    const validation = validateAIResponse(simulatedPayload);

    this.logMetric(
      'Operational Recommendation',
      promptVersion,
      startTime,
      validation.valid,
      JSON.stringify(validation.data).length
    );

    return validation.data;
  }

  // 4. Generate Multilingual Announcement (Simulation/Sandbox)
  async generateMultilingualAnnouncement(context: string): Promise<AIResponse> {
    const startTime = Date.now();
    const prompt = announcementPrompt_v1(context);
    const promptVersion = 'announcementPrompt_v1';

    const simulatedPayload = {
      ...mockAIResponse,
      summary: `Stadium communications dispatcher: Broadcast alert generated.`,
      announcement: {
        english: `Safety alert: ${context}`,
        spanish: `Alerta de seguridad: ${context}`,
        french: `Alerte de sécurité: ${context}`,
      }
    };
    const validation = validateAIResponse(simulatedPayload);

    this.logMetric(
      'Emergency Announcement',
      promptVersion,
      startTime,
      validation.valid,
      JSON.stringify(validation.data).length
    );

    return validation.data;
  }

  // 5. Predict Crowd Risk (Simulation/Sandbox)
  async predictCrowdRisk(sensorData: any): Promise<AIResponse> {
    const startTime = Date.now();
    const prompt = crowdRiskPrompt_v1(JSON.stringify(sensorData));
    const promptVersion = 'crowdRiskPrompt_v1';

    const simulatedPayload = {
      ...mockAIResponse,
      summary: `AI predictive risk analysis: Anticipating 15% occupancy surge at Gate A in the next 15 minutes based on arriving train lists.`,
      riskLevel: 'Low',
    };
    const validation = validateAIResponse(simulatedPayload);

    this.logMetric(
      'Predictive Risk',
      promptVersion,
      startTime,
      validation.valid,
      JSON.stringify(validation.data).length
    );

    return validation.data;
  }

  // 6. CSV Pipeline upload analysis (Real Gemini SDK Integration)
  async analyzeUploadedCsv(csvStatsJson: string): Promise<AIResponse> {
    const startTime = Date.now();
    const prompt = csvAnalysisPrompt_v1(csvStatsJson);
    const promptVersion = 'csvAnalysisPrompt_v1';

    let validatedData: AIResponse;
    let success = false;
    let responseText = '';

    try {
      // Execute the Gemini call using our wrapper containing timeout and retry protections
      responseText = await this.executeGeminiCallWithRetryAndTimeout(prompt);
      
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr: any) {
        throw new Error(`Failed to parse Gemini response as JSON: ${parseErr.message}`);
      }

      const validation = validateAIResponse(parsed);
      validatedData = validation.data;
      success = validation.valid;

    } catch (error: any) {
      console.error('[Gemini Service Error] analyzeUploadedCsv execution failed:', error.stack || error.message);
      
      // Safety operational fallback in case of errors/validation failure
      validatedData = getSafeFallback(`Gemini CSV execution failure: ${error.message}`);
      success = false;
      responseText = JSON.stringify(validatedData);
    }

    this.logMetric(
      'CSV Analysis',
      promptVersion,
      startTime,
      success,
      responseText.length
    );

    return validatedData;
  }

  // 7. Decision History & Outcome logging
  getDecisionHistory(): DecisionHistory[] {
    return decisionsDatabase;
  }

  saveDecisionOutcome(id: string, outcomeDetails: { accepted: boolean; executionStatus: DecisionHistory['executionStatus']; notes?: string; actualOutcome?: string }): DecisionHistory | null {
    const decision = decisionsDatabase.find(d => d.id === id);
    if (!decision) return null;

    decision.accepted = outcomeDetails.accepted;
    decision.executionStatus = outcomeDetails.executionStatus;
    if (outcomeDetails.notes) decision.organizerNotes = outcomeDetails.notes;
    if (outcomeDetails.actualOutcome) decision.actualOutcome = outcomeDetails.actualOutcome;

    return decision;
  }

  getMetrics(): AIMetric[] {
    return metricsDatabase;
  }

  // Future Streaming Support Interface Design
  streamRecommendations(
    situation: string, 
    resources: string, 
    onChunk: (chunk: AIStreamChunk) => void, 
    onError: (err: any) => void
  ): void {
    console.log('Gemini: streamRecommendations requested (streaming skeleton mode)');
    
    // Simulate streaming chunks
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count === 1) {
        onChunk({ text: "Beginning AI operational reasoning analysis...", done: false });
      } else if (count === 2) {
        onChunk({ text: "Evaluating Gate B turnstile telemetry...", done: false });
      } else if (count === 3) {
        onChunk({ 
          text: "Recommendations generated.", 
          done: true, 
          metadata: { ...mockAIResponse } 
        });
        clearInterval(interval);
      }
    }, 1000);
  }
}

export const geminiService = new GeminiService();
