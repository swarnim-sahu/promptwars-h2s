import { z } from 'zod';

export const GetRecommendationsSchema = z.object({
  situation: z.string().optional(),
  resources: z.string().optional(),
}).strict();

export const SummarizeIncidentSchema = z.object({
  incidentLogs: z.unknown(),
}).strict();
