import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import {
  analyzeCrowd,
  summarizeIncident,
  getRecommendations,
  createAnnouncement,
  predictRisk,
  parseCsvFile,
  analyzeCsvStats,
  getHistory,
  logOutcome,
  getMetrics,
  checkGeminiHealth,
  generateEmergencyAnnouncement
} from '../controllers/aiController';
import { validateBody } from '../middleware/validation';
import { AnalyzeCrowdSchema, PredictRiskSchema } from '../schemas/crowd';
import { GetRecommendationsSchema, SummarizeIncidentSchema } from '../schemas/operations';
import { CreateAnnouncementSchema, GenerateEmergencyAnnouncementSchema } from '../schemas/announcement';
import { AnalyzeCsvStatsSchema, LogOutcomeSchema } from '../schemas/analytics';
import { ApiErrorResponse } from '../types/dto';

const router = Router();

// Protect all AI endpoints using express-rate-limit
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  // Use high limits in test mode to ensure tests never fail due to rate limits
  limit: process.env.NODE_ENV === 'test' ? 1000 : 30,
  handler: (req: Request, res: Response<ApiErrorResponse>) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again after a minute.'
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(aiLimiter);

// Configure in-memory upload storage with strict file type checks
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max
  },
  fileFilter: (req, file, callback) => {
    const ext = file.originalname.toLowerCase();
    const isCsvExt = ext.endsWith('.csv');
    const isCsvMime = file.mimetype === 'text/csv' || 
                      file.mimetype === 'application/csv' || 
                      file.mimetype === 'application/vnd.ms-excel' || 
                      file.mimetype === 'text/plain'; // Allow plain text support for tests/fallbacks
    
    if (!isCsvExt || !isCsvMime) {
      const err = new Error('Only CSV files are supported.');
      (err as any).statusCode = 400;
      return callback(err);
    }
    callback(null, true);
  }
});

// Wrapper middleware executing upload and capturing multer errors
const handleCsvUpload = (req: Request, res: Response, next: NextFunction): void => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      const status = (err as any).statusCode || (err.code === 'LIMIT_FILE_SIZE' ? 400 : 400);
      const msg = err.code === 'LIMIT_FILE_SIZE' 
        ? 'File exceeds maximum allowable size. The upload limit is 2MB.' 
        : err.message || 'File upload failed.';
      
      res.status(status).json({
        success: false,
        message: msg
      });
      return;
    }
    next();
  });
};

// 1. Crowd Operations & Planning Routes
router.post('/analyze-crowd', validateBody(AnalyzeCrowdSchema), analyzeCrowd);
router.post('/predict-risk', validateBody(PredictRiskSchema), predictRisk);
router.post('/recommendations', validateBody(GetRecommendationsSchema), getRecommendations);

// 2. Incident Summary & Comms Routes
router.post('/summarize-incident', validateBody(SummarizeIncidentSchema), summarizeIncident);
router.post('/announcement', validateBody(CreateAnnouncementSchema), createAnnouncement);
router.post('/generate-announcement', validateBody(GenerateEmergencyAnnouncementSchema, "Validation failed: All parameters (incidentType, location, severity, description, audience, tone) are required."), generateEmergencyAnnouncement);

// 3. CSV Ingest and Analytics Routes
router.post('/parse-csv', handleCsvUpload, parseCsvFile);
router.post('/analyze-stats', validateBody(AnalyzeCsvStatsSchema), analyzeCsvStats);

// 4. Decision History Logging Outcomes
router.get('/history', getHistory);
router.post('/history/:id/outcome', validateBody(LogOutcomeSchema), logOutcome);

// 5. Diagnostics Metrics Logs
router.get('/metrics', getMetrics);
router.get('/health-gemini', checkGeminiHealth);

export default router;
