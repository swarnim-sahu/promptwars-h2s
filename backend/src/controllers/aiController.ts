import { Request, Response, NextFunction } from 'express';
import { geminiService } from '../services/geminiService';

// 1. Analyze Crowd Data
export const analyzeCrowd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gateData, crowdVelocity } = req.body;
    const result = await geminiService.analyzeCrowdData(gateData || {}, crowdVelocity || {});
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// 2. Summarize Incident
export const summarizeIncident = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { incidentLogs } = req.body;
    if (!incidentLogs) {
      res.status(400).json({ success: false, message: 'Incident logs are required.' });
      return;
    }
    const result = await geminiService.generateIncidentSummary(incidentLogs);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// 3. Operational Recommendations
export const getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { situation, resources } = req.body;
    const result = await geminiService.generateOperationalRecommendations(
      situation || 'General crowd flow',
      resources || 'Steward team roster'
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// 4. Emergency Announcement
export const createAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { context } = req.body;
    if (!context) {
      res.status(400).json({ success: false, message: 'Announcement context is required.' });
      return;
    }
    const result = await geminiService.generateMultilingualAnnouncement(context);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// 5. Predict Crowd Risk
export const predictRisk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sensorData } = req.body;
    const result = await geminiService.predictCrowdRisk(sensorData || {});
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// 6. CSV Pipeline Upload Placeholder
export const uploadCsv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'CSV file attachment is required.' });
      return;
    }

    // Validate mime-type / filename extension
    if (!req.file.originalname.endsWith('.csv')) {
      res.status(400).json({ success: false, message: 'Only CSV files are supported.' });
      return;
    }

    // CSV parsing pipeline placeholder (simulates buffer decoding)
    const csvContent = req.file.buffer.toString('utf8');
    
    // Validate CSV column header structure
    if (!csvContent.toLowerCase().includes('gate') && !csvContent.toLowerCase().includes('occupancy')) {
      res.status(400).json({ success: false, message: 'Invalid CSV format. Missing required columns (Gate, Occupancy).' });
      return;
    }

    const result = await geminiService.analyzeUploadedCsv(csvContent);
    res.status(200).json({ 
      success: true, 
      message: 'CSV file processed successfully through simulated analysis pipeline.',
      data: result 
    });
  } catch (error) {
    next(error);
  }
};

// 7. Decision History Logs
export const getHistory = (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = geminiService.getDecisionHistory();
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    next(error);
  }
};

// 8. Log Decision Outcome (Accept/Reject actions)
export const logOutcome = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { accepted, executionStatus, notes, actualOutcome } = req.body;
    
    if (typeof accepted !== 'boolean') {
      res.status(400).json({ success: false, message: 'Accepted boolean status is required.' });
      return;
    }

    const updated = geminiService.saveDecisionOutcome(id, {
      accepted,
      executionStatus: executionStatus || 'Executed',
      notes: notes ? String(notes) : undefined,
      actualOutcome: actualOutcome ? String(actualOutcome) : undefined,
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
  } catch (error) {
    next(error);
  }
};

// 9. AI Metrics logs
export const getMetrics = (req: Request, res: Response, next: NextFunction) => {
  try {
    const metrics = geminiService.getMetrics();
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    next(error);
  }
};

// 10. Gemini Health Diagnostic Handshake check
export const checkGeminiHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const health = await geminiService.verifyConnectivity();
    if (health.success) {
      res.status(200).json(health);
    } else {
      res.status(503).json(health);
    }
  } catch (error) {
    next(error);
  }
};
