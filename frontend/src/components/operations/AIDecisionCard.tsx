import React, { useState, useEffect, useCallback } from 'react';
import { geminiService } from '../../services/geminiService';
import type { AIResponse } from '../../types';
import { TelemetryInputsDrawer } from './ai-decision-card/TelemetryInputsDrawer';
import { DecisionPanel } from './ai-decision-card/DecisionPanel';

interface AIDecisionCardProps {
  csvAnalysisResult?: AIResponse;
  onResetManual?: () => void;
}

export const AIDecisionCard: React.FC<AIDecisionCardProps> = ({ 
  csvAnalysisResult, 
  onResetManual 
}) => {
  // Telemetry Inputs State (Manual Mode)
  const [gate, setGate] = useState('Gate B');
  const [occupancy, setOccupancy] = useState(89);
  const [entryRate, setEntryRate] = useState(14);
  const [weather, setWeather] = useState('Rain expected');
  const [volunteers, setVolunteers] = useState(6);
  const [medicalIncidents, setMedicalIncidents] = useState(0);
  const [transportDelay, setTransportDelay] = useState(true);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIResponse | null>(null);
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});

  // Auto-run initial analysis on mount
  useEffect(() => {
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const telemetry = {
        gate,
        occupancy,
        entryRate,
        weather,
        volunteers,
        medicalIncidents,
        transportDelay
      };
      
      const result = await geminiService.analyzeCrowdData(telemetry, {});
      setAnalysisResult(result);
      setCompletedActions({});
    } catch (err: any) {
      console.error("AI Analysis failed:", err);
      setError(err.message || "Failed to contact StadiumMind AI agent.");
    } finally {
      setLoading(false);
    }
  }, [gate, occupancy, entryRate, weather, volunteers, medicalIncidents, transportDelay]);

  const toggleAction = useCallback((idx: number) => {
    setCompletedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  }, []);

  // Determine active dataset (use CSV upload result if available, otherwise manual state result)
  const activeResult = csvAnalysisResult || analysisResult;
  const isCsvMode = !!csvAnalysisResult;

  const handleExportReport = useCallback(() => {
    if (!activeResult) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stadiummind-ai-report-${activeResult.analysisId || 'telemetry'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [activeResult]);

  return (
    <div className="rounded-2xl border border-[#1f293d] bg-[#0c1220]/90 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full min-h-[580px] relative">
      <TelemetryInputsDrawer
        isCsvMode={isCsvMode}
        onResetManual={onResetManual}
        gate={gate}
        setGate={setGate}
        occupancy={occupancy}
        setOccupancy={setOccupancy}
        entryRate={entryRate}
        setEntryRate={setEntryRate}
        weather={weather}
        setWeather={setWeather}
        volunteers={volunteers}
        setVolunteers={setVolunteers}
        medicalIncidents={medicalIncidents}
        setMedicalIncidents={setMedicalIncidents}
        transportDelay={transportDelay}
        setTransportDelay={setTransportDelay}
        loading={loading}
        onExecuteAI={runAnalysis}
      />
      <DecisionPanel
        isCsvMode={isCsvMode}
        loading={loading}
        error={error}
        activeResult={activeResult}
        completedActions={completedActions}
        onToggleAction={toggleAction}
        onExportReport={handleExportReport}
        onRetryAnalysis={runAnalysis}
      />
    </div>
  );
};
