import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';

// Mock geminiService for backend integration tests
vi.mock('../services/geminiService', () => {
  return {
    geminiService: {
      analyzeCrowdData: vi.fn().mockImplementation((gateData, crowdVelocity) => {
        if (gateData && gateData.shouldFail) {
          throw new Error('Database connection failed');
        }
        return Promise.resolve({
          summary: "Gate B bottleneck detected. Flow redirection advised.",
          riskLevel: "Medium",
          confidence: 85,
          reasoning: ["Reason 1: Rain is causing slower egress.", "Reason 2: Volunteers are low."],
          recommendedActions: ["Direct incoming fans to Gate A", "Deploy 2 additional stewards to Gate B"],
          expectedImpact: "Reduce congestion by 35%",
          analysisId: "123e4567-e89b-12d3-a456-426614174000",
          analysisTimestamp: "2026-07-16T13:00:00Z"
        });
      }),
      generateEmergencyAnnouncement: vi.fn().mockResolvedValue({
        announcement: {
          english: "Attention all fans: please use Gate A for exit.",
          spanish: "Atención aficionados: por favor usen la Puerta A para salir.",
          french: "Attention aux supporters: veuillez utiliser la Porte A pour sortir."
        },
        confidence: 95
      }),
      analyzeUploadedCsv: vi.fn().mockResolvedValue({
        summary: "CSV analysis complete. Moderate crowd risk detected.",
        riskLevel: "High",
        confidence: 90,
        reasoning: ["Average occupancy is high.", "Medical incidents detected."],
        recommendedActions: ["Implement staggered exit routing", "Increase gate staff"],
        expectedImpact: "Ensure safe flow transition",
        analysisId: "csv-12345",
        analysisTimestamp: "2026-07-16T13:05:00Z"
      }),
      verifyConnectivity: vi.fn().mockResolvedValue({
        success: true,
        model: "gemini-3.1-flash-lite",
        latency: 120
      })
    }
  };
});

describe('Backend API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /api/status should return system status details', async () => {
    const response = await request(app)
      .get('/api/status')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.message).toContain('fully operational');
  });

  it('GET /api/non-existent-route should return 404', async () => {
    const response = await request(app)
      .get('/api/non-existent-route')
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toContain('Endpoint not found');
  });

  describe('Crowd Analysis API - POST /api/ai/analyze-crowd', () => {
    it('should successfully analyze crowd data with valid inputs', async () => {
      const payload = {
        gateData: { gateB: 85 },
        crowdVelocity: { gateB: 1.2 }
      };

      const response = await request(app)
        .post('/api/ai/analyze-crowd')
        .send(payload)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('summary');
      expect(response.body.data.riskLevel).toBe('Medium');
    });

    it('should trigger internal server error response when service throws an exception', async () => {
      const payload = {
        gateData: { shouldFail: true }
      };

      const response = await request(app)
        .post('/api/ai/analyze-crowd')
        .send(payload)
        .expect(500);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('CSV Ingestion API - POST /api/ai/parse-csv', () => {
    it('should successfully validate and parse standard CSV formatted file attachment', async () => {
      const csvContent = 'Timestamp,Gate,Occupancy,EntryRate,Weather,Volunteers,MedicalIncidents\n14:00,Gate B,89,14,Rain,6,0';

      const response = await request(app)
        .post('/api/ai/parse-csv')
        .attach('file', Buffer.from(csvContent), 'telemetry.csv')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.message).toContain('parsed and validated successfully');
      expect(response.body.data).toHaveProperty('averageOccupancy', 89);
      expect(response.body.data.congestedGates).toContain('Gate B');
    });

    it('should fail with 400 when no file is attached', async () => {
      const response = await request(app)
        .post('/api/ai/parse-csv')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('CSV file attachment is required');
    });

    it('should fail with 400 when file extension is not CSV', async () => {
      const response = await request(app)
        .post('/api/ai/parse-csv')
        .attach('file', Buffer.from('hello world'), 'telemetry.txt')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Only CSV files are supported');
    });

    it('should fail with 400 when CSV parsing fails due to blank file', async () => {
      const response = await request(app)
        .post('/api/ai/parse-csv')
        .attach('file', Buffer.from(''), 'telemetry.csv')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Failed to parse CSV file');
    });

    it('should fail with 400 when CSV contains headers but no data records', async () => {
      const headersOnly = 'Timestamp,Gate,Occupancy,EntryRate,Weather,Volunteers,MedicalIncidents\n';
      const response = await request(app)
        .post('/api/ai/parse-csv')
        .attach('file', Buffer.from(headersOnly), 'telemetry.csv')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('CSV file is empty or contains no records');
    });

    it('should fail with 400 when required CSV headers are missing', async () => {
      const invalidCsv = 'Timestamp,Gate,Occupancy,EntryRate,Weather\n14:00,Gate B,89,14,Rain';

      const response = await request(app)
        .post('/api/ai/parse-csv')
        .attach('file', Buffer.from(invalidCsv), 'telemetry.csv')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('CSV is missing required column: volunteers');
    });

    it('should fail with 400 when numeric validation checks fail', async () => {
      const invalidCsv = 'Timestamp,Gate,Occupancy,EntryRate,Weather,Volunteers,MedicalIncidents\n14:00,Gate B,abc,14,Rain,6,0';

      const response = await request(app)
        .post('/api/ai/parse-csv')
        .attach('file', Buffer.from(invalidCsv), 'telemetry.csv')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Invalid numeric value found on record index 1');
    });
  });

  describe('Announcement Generator API - POST /api/ai/generate-announcement', () => {
    it('should successfully generate translations when all fields are supplied', async () => {
      const payload = {
        incidentType: 'Congestion',
        location: 'Gate B Egress area',
        severity: 'Medium',
        description: 'Ticketing validations are offline.',
        audience: 'Entire Stadium',
        tone: 'Urgent'
      };

      const response = await request(app)
        .post('/api/ai/generate-announcement')
        .send(payload)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data.announcement).toHaveProperty('english');
      expect(response.body.data.announcement.spanish).toContain('salir');
    });

    it('should return 400 error status if required fields are missing from payload', async () => {
      const payload = {
        incidentType: 'Congestion',
        location: 'Gate B'
      };

      const response = await request(app)
        .post('/api/ai/generate-announcement')
        .send(payload)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('All parameters');
    });
  });
});
