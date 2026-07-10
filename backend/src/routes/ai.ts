import { Router } from 'express';
import multer from 'multer';
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
  checkGeminiHealth
} from '../controllers/aiController';

const router = Router();

// Configure in-memory upload storage for CSV pipe validation
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max
  }
});

// 1. Crowd Operations & Planning Routes
router.post('/analyze-crowd', analyzeCrowd);
router.post('/predict-risk', predictRisk);
router.post('/recommendations', getRecommendations);

// 2. Incident Summary & Comms Routes
router.post('/summarize-incident', summarizeIncident);
router.post('/announcement', createAnnouncement);

// 3. CSV Ingest and Analytics Routes
router.post('/parse-csv', upload.single('file'), parseCsvFile);
router.post('/analyze-stats', analyzeCsvStats);

// 4. Decision History Logging Outcomes
router.get('/history', getHistory);
router.post('/history/:id/outcome', logOutcome);

// 5. Diagnostics Metrics Logs
router.get('/metrics', getMetrics);
router.get('/health-gemini', checkGeminiHealth);

export default router;
