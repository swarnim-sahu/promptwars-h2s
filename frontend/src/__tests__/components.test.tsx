import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { OperationsDashboard } from '../pages/OperationsDashboard';
import { AIDecisionCard } from '../components/operations/AIDecisionCard';
import { AIAnnouncementGenerator } from '../components/operations/AIAnnouncementGenerator';
import { TelemetryUploadCard } from '../components/operations/TelemetryUploadCard';

// Mock framer-motion AnimatePresence to avoid JSDOM exit lifecycle lags
vi.mock('framer-motion', async (importOriginal) => {
  const original = await importOriginal<typeof import('framer-motion')>();
  return {
    ...original,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock geminiService
vi.mock('../services/geminiService', () => {
  const mockAnalyzeCrowdData = vi.fn().mockResolvedValue({
    summary: "Gate B bottleneck detected. Flow redirection advised.",
    riskLevel: "Medium",
    confidence: 85,
    reasoning: ["Reason 1: Rain is causing slower egress.", "Reason 2: Volunteers are low."],
    recommendedActions: ["Direct incoming fans to Gate A", "Deploy 2 additional stewards to Gate B"],
    expectedImpact: "Reduce congestion by 35%",
    analysisId: "123e4567-e89b-12d3-a456-426614174000",
    analysisTimestamp: "2026-07-16T13:00:00Z"
  });

  const mockGenerateEmergencyAnnouncement = vi.fn().mockResolvedValue({
    announcement: {
      english: "Attention all fans: please use Gate A for exit.",
      spanish: "Atención aficionados: por favor usen la Puerta A para salir.",
      french: "Attention aux supporters: veuillez utiliser la Porte A pour sortir."
    },
    confidence: 95
  });

  const mockParseCsvTelemetryFile = vi.fn().mockResolvedValue({
    avgOccupancy: 75,
    totalEntryRate: 120,
    medicalIncidentCount: 1,
    volunteerCount: 15,
    congestedGates: ["Gate B"],
    totalRecords: 10
  });

  const mockAnalyzeCsvTelemetryStats = vi.fn().mockResolvedValue({
    summary: "CSV analysis complete. Moderate crowd risk detected.",
    riskLevel: "High",
    confidence: 90,
    reasoning: ["Average occupancy is high.", "Medical incidents detected."],
    recommendedActions: ["Implement staggered exit routing", "Increase gate staff"],
    expectedImpact: "Ensure safe flow transition",
    analysisId: "csv-12345",
    analysisTimestamp: "2026-07-16T13:05:00Z"
  });

  return {
    geminiService: {
      analyzeCrowdData: mockAnalyzeCrowdData,
      generateEmergencyAnnouncement: mockGenerateEmergencyAnnouncement,
      parseCsvTelemetryFile: mockParseCsvTelemetryFile,
      analyzeCsvTelemetryStats: mockAnalyzeCsvTelemetryStats
    }
  };
});

describe('StadiumMind AI Frontend Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Navbar correctly with brand links and interactive elements', () => {
    const handleScroll = vi.fn();
    render(
      <BrowserRouter>
        <AppProvider>
          <Navbar onScrollToSection={handleScroll} />
        </AppProvider>
      </BrowserRouter>
    );

    // Verify app name is displayed
    expect(screen.getByText('StadiumMind AI')).toBeInTheDocument();

    // Verify navigation links are rendered
    const featuresButton = screen.getByText('Features');
    expect(featuresButton).toBeInTheDocument();

    // Verify click triggers scroll callback
    fireEvent.click(featuresButton);
    expect(handleScroll).toHaveBeenCalledWith('features');
  });

  it('renders HeroSection correctly with main titles and routes CTA to Operations Center', () => {
    const handleLearnMore = vi.fn();
    render(
      <BrowserRouter>
        <AppProvider>
          <HeroSection onLearnMoreClick={handleLearnMore} />
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Stadium Operations')).toBeInTheDocument();
    expect(screen.getByText('Launch Operations Center')).toBeInTheDocument();
    
    const learnMoreBtn = screen.getByText('Learn More');
    fireEvent.click(learnMoreBtn);
    expect(handleLearnMore).toHaveBeenCalled();
  });

  it('renders OperationsDashboard with critical panels', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <OperationsDashboard />
        </AppProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Operations Command Center')).toBeInTheDocument();
    expect(screen.getByText('AI Telemetry Ingest & Analytics')).toBeInTheDocument();
    expect(screen.getByText('AI Multilingual Announcement Generator')).toBeInTheDocument();

    // Wait for the mounted AIDecisionCard initial analysis to finish to prevent async state updates from leaking
    await waitFor(() => {
      expect(screen.getByText('Gate B bottleneck detected. Flow redirection advised.')).toBeInTheDocument();
    });
  });

  it('renders AIDecisionCard and queries Gemini AI crowd data analysis', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <AIDecisionCard />
        </AppProvider>
      </BrowserRouter>
    );

    // Verify dashboard inputs are available
    expect(screen.getByLabelText(/Gate Sector/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telemetry occupancy percentage/i)).toBeInTheDocument();

    // Trigger analysis
    const executeBtn = screen.getByRole('button', { name: /Query Gemini AI models for crowd evaluation report/i });
    await act(async () => {
      fireEvent.click(executeBtn);
    });

    // Wait for the mock result to render
    await waitFor(() => {
      expect(screen.getByText('Gate B bottleneck detected. Flow redirection advised.')).toBeInTheDocument();
    });

    // Check explainable reasoning elements
    expect(screen.getByText('Reason 1')).toBeInTheDocument();
    expect(screen.getByText('Reason 1: Rain is causing slower egress.')).toBeInTheDocument();
  });

  it('renders AIAnnouncementGenerator and drafts translations matching configuration', async () => {
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <AIAnnouncementGenerator />
        </AppProvider>
      </BrowserRouter>
    );

    // Fill in announcement incident inputs by ID
    const locationInput = container.querySelector('#ann-location') as HTMLInputElement;
    const descTextarea = container.querySelector('#ann-description') as HTMLTextAreaElement;

    expect(locationInput).toBeInTheDocument();
    expect(descTextarea).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(locationInput, { target: { value: 'Section 108 near Gate B' } });
      fireEvent.change(descTextarea, { target: { value: 'Heavy congestion due to scanner failure.' } });
    });

    // Submit form by clicking the submit button directly
    const submitBtn = screen.getByRole('button', { name: /Generate Announcement/i });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    // Wait for generated translations
    await waitFor(() => {
      expect(screen.getByText(/Attention all fans: please use Gate A for exit/i)).toBeInTheDocument();
    });

    // Verify copy action elements are rendered
    expect(screen.getByRole('button', { name: /Copy active announcement translation/i })).toBeInTheDocument();
  });

  it('renders TelemetryUploadCard and handles CSV file drop parsing actions', async () => {
    const handleAnalysisComplete = vi.fn();
    const { container } = render(
      <BrowserRouter>
        <AppProvider>
          <TelemetryUploadCard 
            onAnalysisComplete={handleAnalysisComplete} 
            onReset={vi.fn()} 
          />
        </AppProvider>
      </BrowserRouter>
    );

    // Verify upload card drop zone exists
    expect(screen.getByText(/Drag & drop telemetry log or click to browse/i)).toBeInTheDocument();

    // Create a mock CSV file
    const file = new File(
      ['Timestamp,Gate,Occupancy,EntryRate,Weather,Volunteers,MedicalIncidents\n14:00,Gate B,89,14,Rain,6,0'], 
      'stadium_telemetry.csv', 
      { type: 'text/csv' }
    );

    // Retrieve input file element from container query selection
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    
    // Simulate file upload selection using Object.defineProperty
    await act(async () => {
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: true
      });
      fireEvent.change(input);
    });

    // Wait for file state updates and statistics to calculate
    await waitFor(() => {
      expect(screen.getByText(/Telemetry Statistics Generated/i)).toBeInTheDocument();
      expect(screen.getByText(/stadium_telemetry.csv/i)).toBeInTheDocument();
    });

    // Run statistics analysis with Gemini AI
    const analyzeBtn = screen.getByRole('button', { name: /Analyze Stats with Gemini AI/i });
    await act(async () => {
      fireEvent.click(analyzeBtn);
    });

    await waitFor(() => {
      expect(handleAnalysisComplete).toHaveBeenCalled();
    });
  });
});
