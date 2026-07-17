import { z } from 'zod';

export const AnalyzeCrowdSchema = z.object({
  gateData: z.record(z.string(), z.unknown()).optional(),
  crowdVelocity: z.record(z.string(), z.unknown()).optional(),
}).strict();

export const PredictRiskSchema = z.object({
  sensorData: z.record(z.string(), z.unknown()).optional(),
}).strict();
