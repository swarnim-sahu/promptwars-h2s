import { z } from 'zod';

export const AnalyzeCsvStatsSchema = z.object({
  stats: z.object({
    totalRecords: z.number(),
    averageOccupancy: z.number(),
    maxOccupancy: z.number(),
    maxOccupancyGate: z.string(),
    averageEntryRate: z.number(),
    totalMedical: z.number(),
    totalVolunteers: z.number(),
    uniqueGates: z.array(z.string()),
    weatherSummary: z.string(),
    congestedGates: z.array(z.string()),
  }).strict(),
}).strict();

export const LogOutcomeSchema = z.object({
  accepted: z.boolean(),
  executionStatus: z.enum(['Pending', 'Executed', 'Cancelled']).optional(),
  notes: z.string().optional(),
  actualOutcome: z.string().optional(),
}).strict();
