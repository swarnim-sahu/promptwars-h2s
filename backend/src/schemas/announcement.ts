import { z } from 'zod';

export const CreateAnnouncementSchema = z.object({
  context: z.string().min(1, "Announcement context is required."),
}).strict();

export const GenerateEmergencyAnnouncementSchema = z.object({
  incidentType: z.string().min(1),
  location: z.string().min(1),
  severity: z.string().min(1),
  description: z.string().min(1),
  audience: z.string().min(1),
  tone: z.string().min(1),
}).strict();
