import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import Papa from 'papaparse';
import { geminiService } from '../services/geminiService';
import { TelemetryRecord, AIResponse, ParsedTelemetryStats, DecisionHistory, AIMetric } from '../types/ai';
import {
  AnalyzeCrowdRequest,
  PredictRiskRequest,
  GetRecommendationsRequest,
  SummarizeIncidentRequest,
  CreateAnnouncementRequest,
  GenerateEmergencyAnnouncementRequest,
  AnalyzeCsvStatsRequest,
  LogOutcomeRequest,
  ApiResponse,
  GeminiHealthResponse
} from '../types/dto';

// 1. Analyze Crowd Data
export const analyzeCrowd = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, AnalyzeCrowdRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { gateData, crowdVelocity } = req.body;
    const result = await geminiService.analyzeCrowdData(
      gateData || {}, 
      crowdVelocity || {}
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    next(error);
  }
};

// 2. Summarize Incident
export const summarizeIncident = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, SummarizeIncidentRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { incidentLogs } = req.body;
    const result = await geminiService.generateIncidentSummary(incidentLogs);
    res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    next(error);
  }
};

// 3. Operational Recommendations
export const getRecommendations = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, GetRecommendationsRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { situation, resources } = req.body;
    const result = await geminiService.generateOperationalRecommendations(
      situation || 'General crowd flow',
      resources || 'Steward team roster'
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    next(error);
  }
};

// 4. Emergency Announcement
export const createAnnouncement = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, CreateAnnouncementRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { context } = req.body;
    const result = await geminiService.generateMultilingualAnnouncement(context);
    res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    next(error);
  }
};

// 5. Predict Crowd Risk
export const predictRisk = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, PredictRiskRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { sensorData } = req.body;
    const result = await geminiService.predictCrowdRisk(sensorData || {});
    res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    next(error);
  }
};

// 6. CSV Pipeline Parsing & Statistics Engine
export const parseCsvFile = async (
  req: Request, 
  res: Response<ApiResponse<ParsedTelemetryStats>>, 
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'CSV file attachment is required.' });
      return;
    }

    const csvContent = req.file.buffer.toString('utf8');

    // Parse using production-grade PapaParse library with explicit types
    const parsed = Papa.parse<Record<string, string>>(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors && parsed.errors.length > 0 && parsed.data.length === 0) {
      res.status(400).json({ 
        success: false, 
        message: `Failed to parse CSV file: ${parsed.errors[0].message}` 
      });
      return;
    }

    const rows = parsed.data;
    if (rows.length === 0) {
      res.status(400).json({ success: false, message: 'CSV file is empty or contains no records.' });
      return;
    }

    // Validate headers (case-insensitive check)
    const headers = Object.keys(rows[0]).map(h => h.trim().toLowerCase());
    const requiredHeaders = ['timestamp', 'gate', 'occupancy', 'entryrate', 'weather', 'volunteers', 'medicalincidents'];
    
    for (const reqHeader of requiredHeaders) {
      if (!headers.includes(reqHeader)) {
        res.status(400).json({ 
          success: false, 
          message: `CSV is missing required column: ${reqHeader}` 
        });
        return;
      }
    }

    // Pre-calculate case-insensitive mapping for O(1) header lookups
    const originalKeys = Object.keys(rows[0]);
    const keyMap: Record<string, string> = {};
    for (const key of originalKeys) {
      keyMap[key.trim().toLowerCase()] = key;
    }

    const getRowValue = (row: Record<string, string>, key: string): string => {
      const originalKey = keyMap[key];
      return originalKey ? row[originalKey] : '';
    };

    // Compile summary statistics over the full dataset
    let totalOccupancy = 0;
    let maxOccupancy = 0;
    let maxOccupancyGate = '';
    let totalEntryRate = 0;
    let totalMedical = 0;
    let totalVolunteers = 0;
    const gatesList = new Set<string>();
    const weatherList = new Set<string>();
    const congestedGates: string[] = [];

    const records: TelemetryRecord[] = [];

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const rawGate = getRowValue(row, 'gate');
      const rawOccupancy = getRowValue(row, 'occupancy');
      const rawEntryRate = getRowValue(row, 'entryrate');
      const rawWeather = getRowValue(row, 'weather');
      const rawVolunteers = getRowValue(row, 'volunteers');
      const rawMedical = getRowValue(row, 'medicalincidents');
      const rawTimestamp = getRowValue(row, 'timestamp');

      const occupancy = parseInt(rawOccupancy, 10);
      const entryRate = parseInt(rawEntryRate, 10);
      const volunteers = parseInt(rawVolunteers, 10);
      const medicalIncidents = parseInt(rawMedical, 10);

      if (isNaN(occupancy) || isNaN(entryRate) || isNaN(volunteers) || isNaN(medicalIncidents)) {
        res.status(400).json({ 
          success: false, 
          message: `Invalid numeric value found on record index ${index + 1}` 
        });
        return;
      }

      totalOccupancy += occupancy;
      totalEntryRate += entryRate;
      totalMedical += medicalIncidents;
      totalVolunteers += volunteers;
      
      if (rawGate) gatesList.add(rawGate);
      if (rawWeather) weatherList.add(rawWeather);

      if (occupancy > maxOccupancy) {
        maxOccupancy = occupancy;
        maxOccupancyGate = rawGate;
      }

      if (occupancy >= 80 && !congestedGates.includes(rawGate)) {
        congestedGates.push(rawGate);
      }

      records.push({
        timestamp: rawTimestamp,
        gate: rawGate,
        occupancy,
        entryRate,
        weather: rawWeather,
        volunteers,
        medicalIncidents
      });
    }

    const stats = {
      totalRecords: records.length,
      averageOccupancy: Math.round(totalOccupancy / records.length),
      maxOccupancy,
      maxOccupancyGate,
      averageEntryRate: Math.round(totalEntryRate / records.length),
      totalMedical,
      totalVolunteers,
      uniqueGates: Array.from(gatesList),
      weatherSummary: Array.from(weatherList).join(', '),
      congestedGates
    };

    res.status(200).json({ 
      success: true, 
      message: 'CSV file parsed and validated successfully.',
      data: stats 
    });
  } catch (error: unknown) {
    next(error);
  }
};

// 7. AI Operational Analytics on Summarized CSV Stats
export const analyzeCsvStats = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, AnalyzeCsvStatsRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { stats } = req.body;
    const result = await geminiService.analyzeUploadedCsv(JSON.stringify(stats));
    res.status(200).json({ 
      success: true, 
      message: 'Operational telemetry analysis report generated.',
      data: result 
    });
  } catch (error: unknown) {
    next(error);
  }
};

// 8. Decision History Logs
export const getHistory = (
  req: Request, 
  res: Response<ApiResponse<DecisionHistory[]>>, 
  next: NextFunction
): void => {
  try {
    const list = geminiService.getDecisionHistory();
    res.status(200).json({ success: true, data: list });
  } catch (error: unknown) {
    next(error);
  }
};

// 9. Log Decision Outcome (Accept/Reject actions)
export const logOutcome = (
  req: Request<{ id: string }, ApiResponse<DecisionHistory>, LogOutcomeRequest>, 
  res: Response<ApiResponse<DecisionHistory>>, 
  next: NextFunction
): void => {
  try {
    const id = req.params.id;
    const { accepted, executionStatus, notes, actualOutcome } = req.body;

    const updated = geminiService.saveDecisionOutcome(id, {
      accepted,
      executionStatus: executionStatus || 'Executed',
      notes,
      actualOutcome,
    });

    if (!updated) {
      res.status(404).json({ success: false, message: `Decision with ID ${id} not found.` });
      return;
    }

    res.status(200).json({ 
      success: true, 
      message: 'Decision outcome logged successfully.',
      data: updated 
    });
  } catch (error: unknown) {
    next(error);
  }
};

// 10. AI Metrics logs
export const getMetrics = (
  req: Request, 
  res: Response<ApiResponse<AIMetric[]>>, 
  next: NextFunction
): void => {
  try {
    const metrics = geminiService.getMetrics();
    res.status(200).json({ success: true, data: metrics });
  } catch (error: unknown) {
    next(error);
  }
};

// 11. Gemini Health Diagnostic Handshake check
export const checkGeminiHealth = async (
  req: Request, 
  res: Response<GeminiHealthResponse>, 
  next: NextFunction
): Promise<void> => {
  try {
    const health = await geminiService.verifyConnectivity();
    if (health.success) {
      res.status(200).json(health);
    } else {
      res.status(503).json(health);
    }
  } catch (error: unknown) {
    next(error);
  }
};

// 12. Multilingual Emergency Announcement Generator Controller
export const generateEmergencyAnnouncement = async (
  req: Request<ParamsDictionary, ApiResponse<AIResponse>, GenerateEmergencyAnnouncementRequest>, 
  res: Response<ApiResponse<AIResponse>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { incidentType, location, severity, description, audience, tone } = req.body;

    const result = await geminiService.generateEmergencyAnnouncement(
      incidentType,
      location,
      severity,
      description,
      audience,
      tone
    );

    res.status(200).json({ success: true, data: result });
  } catch (error: unknown) {
    next(error);
  }
};
