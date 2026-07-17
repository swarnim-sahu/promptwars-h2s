import { z } from 'zod';
import { AnalyzeCrowdSchema, PredictRiskSchema } from '../schemas/crowd';
import { GetRecommendationsSchema, SummarizeIncidentSchema } from '../schemas/operations';
import { CreateAnnouncementSchema, GenerateEmergencyAnnouncementSchema } from '../schemas/announcement';
import { AnalyzeCsvStatsSchema, LogOutcomeSchema } from '../schemas/analytics';

export type AnalyzeCrowdRequest = z.infer<typeof AnalyzeCrowdSchema>;
export type PredictRiskRequest = z.infer<typeof PredictRiskSchema>;
export type GetRecommendationsRequest = z.infer<typeof GetRecommendationsSchema>;
export type SummarizeIncidentRequest = z.infer<typeof SummarizeIncidentSchema>;
export type CreateAnnouncementRequest = z.infer<typeof CreateAnnouncementSchema>;
export type GenerateEmergencyAnnouncementRequest = z.infer<typeof GenerateEmergencyAnnouncementSchema>;
export type AnalyzeCsvStatsRequest = z.infer<typeof AnalyzeCsvStatsSchema>;
export type LogOutcomeRequest = z.infer<typeof LogOutcomeSchema>;

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

export interface SystemStatus {
  success: true;
  message: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
}

export type SystemStatusResponse = SystemStatus | ApiErrorResponse;

export interface GeminiHealthSuccess {
  success: true;
  message: string;
  model?: string;
}

export interface GeminiHealthError {
  success: false;
  message: string;
  model?: string;
}

export type GeminiHealthResponse = GeminiHealthSuccess | GeminiHealthError;
