import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Sparkles, 
  Sliders, 
  Clock, 
  Check
} from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { LoadingState } from '../ai/LoadingState';
import { ErrorState } from '../ai/ErrorState';
import { ConfidenceIndicator } from '../ai/ConfidenceIndicator';
import { AIReasoningPanel } from '../ai/AIReasoningPanel';
import type { AIResponse } from '../../types';

export const AIDecisionCard: React.FC = () => {
  // Telemetry Inputs State
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
  }, []);

  const runAnalysis = async () => {
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
  };

  const toggleAction = (idx: number) => {
    setCompletedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getRiskBadgeColor = (level?: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-950/30 border-red-800 text-red-400';
      case 'High': return 'bg-orange-950/30 border-orange-800 text-orange-400';
      case 'Medium': return 'bg-yellow-950/30 border-yellow-800 text-yellow-400';
      default: return 'bg-emerald-950/30 border-emerald-800 text-emerald-400';
    }
  };

  const getPriorityBadgeColor = (p?: string) => {
    switch (p) {
      case 'High': return 'bg-red-900/10 border-red-900/30 text-rose-300';
      case 'Medium': return 'bg-amber-900/10 border-amber-900/30 text-amber-300';
      default: return 'bg-emerald-900/10 border-emerald-900/30 text-emerald-300';
    }
  };

  return (
    <div className="rounded-2xl border border-[#1f293d] bg-[#0c1220]/90 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full min-h-[580px]">
      
      {/* LEFT: Telemetry Controls Drawer */}
      <div className="w-full lg:w-[240px] p-5 bg-[#121826]/60 border-b lg:border-b-0 lg:border-r border-[#1f293d] space-y-4 flex-shrink-0 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#1f293d] pb-2.5">
            <Sliders className="w-4 h-4 text-fifa-gold-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Telemetry Inputs</span>
          </div>

          {/* Select Gate */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Gate Sector</label>
            <select
              value={gate}
              onChange={(e) => setGate(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
            >
              <option value="Gate A">Gate A (East Stand)</option>
              <option value="Gate B">Gate B (North Stand)</option>
              <option value="Gate C">Gate C (West Stand)</option>
              <option value="Gate D">Gate D (South Stand)</option>
            </select>
          </div>

          {/* Occupancy Percentage */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Occupancy</span>
              <span className="text-white font-mono">{occupancy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={occupancy}
              onChange={(e) => setOccupancy(Number(e.target.value))}
              className="w-full accent-fifa-gold-500"
            />
          </div>

          {/* Entry Rate */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Entry rate</span>
              <span className="text-white font-mono">{entryRate} /min</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={entryRate}
              onChange={(e) => setEntryRate(Number(e.target.value))}
              className="w-full accent-fifa-gold-500"
            />
          </div>

          {/* Weather */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Weather Alert</label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
            >
              <option value="Clear sky">Clear Sky</option>
              <option value="Rain expected">Rain Expected</option>
              <option value="Heavy Storm Warning">Heavy Storm Warning</option>
              <option value="High Heat Hazard">High Heat Hazard</option>
            </select>
          </div>

          {/* Volunteers count */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Volunteers</span>
              <span className="text-white font-mono">{volunteers} stewards</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={volunteers}
              onChange={(e) => setVolunteers(Number(e.target.value))}
              className="w-full accent-fifa-gold-500"
            />
          </div>

          {/* Medical Incidents count */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              <span>Medical logs</span>
              <span className="text-white font-mono">{medicalIncidents} reports</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              value={medicalIncidents}
              onChange={(e) => setMedicalIncidents(Number(e.target.value))}
              className="w-full accent-fifa-gold-500"
            />
          </div>

          {/* Transport Delay */}
          <div className="flex items-center justify-between pt-1">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Train/Bus Delay</label>
            <button
              onClick={() => setTransportDelay(!transportDelay)}
              className={`w-10 h-5 rounded-full p-0.5 transition-all ${
                transportDelay ? 'bg-fifa-gold-500 text-black' : 'bg-[#1c263c]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${
                transportDelay ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Run analysis CTA button */}
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-1.5 bg-gradient-to-r from-fifa-gold-600 to-fifa-gold-700 hover:from-fifa-gold-500 hover:to-fifa-gold-600 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-glow-gold/10 hover:shadow-glow-gold/30 disabled:opacity-40"
        >
          <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          <span>Execute Gemini AI</span>
        </button>
      </div>

      {/* RIGHT: Explainable AI Directive Panel */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-black/10">
        
        {/* Header */}
        <div className="flex items-center space-x-2 border-b border-[#1f293d] pb-4 mb-4">
          <Cpu className="w-5 h-5 text-fifa-gold-400" />
          <h3 className="font-extrabold text-white text-md tracking-tight uppercase">AI Operational Copilot</h3>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              <LoadingState message="Connecting to Google Gemini 2.5 Flash safety models..." />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center"
            >
              <ErrorState message={error} onRetry={runAnalysis} />
            </motion.div>
          ) : analysisResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5 flex-1 flex flex-col justify-between"
            >
              {/* Title, Risk and Confidence */}
              <div className="flex items-start justify-between gap-6 border-b border-[#1f293d]/50 pb-3">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Advisory Risk Mitigation</span>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getRiskBadgeColor(analysisResult.riskLevel)}`}>
                      {analysisResult.riskLevel} Risk
                    </span>
                    {analysisResult.priority && (
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getPriorityBadgeColor(analysisResult.priority)}`}>
                        Priority: {analysisResult.priority}
                      </span>
                    )}
                  </div>
                </div>

                <ConfidenceIndicator confidence={analysisResult.confidence} size="md" />
              </div>

              {/* Summary Description */}
              <div className="text-xs text-gray-300 leading-relaxed font-medium">
                {analysisResult.summary}
              </div>

              {/* Suggested Actions Checklist */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recommended Actions Checklist</span>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {analysisResult.recommendedActions.map((action, idx) => {
                    const isDone = !!completedActions[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleAction(idx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start space-x-3 ${
                          isDone
                            ? 'bg-fifa-green-950/15 border-fifa-green-800 text-fifa-green-400'
                            : 'bg-black/10 border-[#1f293d] hover:border-[#2a3952] text-gray-300'
                        }`}
                      >
                        <span className={`w-4.5 h-4.5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold ${
                          isDone ? 'bg-fifa-green-600 text-white' : 'border border-gray-600 text-gray-500'
                        }`}>
                          {isDone ? <Check className="w-3 h-3" /> : idx + 1}
                        </span>
                        <span className={isDone ? 'line-through text-gray-500 font-medium' : 'font-medium'}>{action}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reasoning basis panel */}
              <AIReasoningPanel reasoning={analysisResult.reasoning} />

              {/* Impact Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#1f293d]/50 pt-4 text-xs">
                <div className="p-3 bg-fifa-green-950/10 border border-fifa-green-900/20 rounded-xl space-y-1">
                  <span className="text-gray-500 font-bold uppercase text-[8px] tracking-wider flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-fifa-green-400" />
                    Projected Impact
                  </span>
                  <span className="text-fifa-green-400 font-bold block leading-relaxed">{analysisResult.expectedImpact}</span>
                </div>

                {analysisResult.estimatedQueueReduction && (
                  <div className="p-3 bg-sky-950/10 border border-sky-900/20 rounded-xl space-y-1">
                    <span className="text-gray-500 font-bold uppercase text-[8px] tracking-wider flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-sky-400" />
                      Queue reduction
                    </span>
                    <span className="text-sky-400 font-bold block leading-relaxed">{analysisResult.estimatedQueueReduction}</span>
                  </div>
                )}
              </div>

              {/* Audit Metadata */}
              {(analysisResult.analysisId || analysisResult.analysisTimestamp) && (
                <div className="text-[8px] text-gray-600 flex justify-between items-center border-t border-[#1f293d]/30 pt-2.5 font-mono">
                  <span>ID: {analysisResult.analysisId}</span>
                  <span>UTC: {analysisResult.analysisTimestamp}</span>
                </div>
              )}

            </motion.div>
          ) : (
            <div className="text-center py-12 text-xs text-gray-600">
              Select telemetry inputs and execute analysis to begin.
            </div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
