import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Download, Sparkles, Clock, Check } from 'lucide-react';
import { LoadingState } from '../../ai/LoadingState';
import { ErrorState } from '../../ai/ErrorState';
import { ConfidenceIndicator } from '../../ai/ConfidenceIndicator';
import { AIReasoningPanel } from '../../ai/AIReasoningPanel';
import type { AIResponse } from '../../../types';

interface DecisionPanelProps {
  isCsvMode: boolean;
  loading: boolean;
  error: string | null;
  activeResult: AIResponse | null;
  completedActions: Record<number, boolean>;
  onToggleAction: (idx: number) => void;
  onExportReport: () => void;
  onRetryAnalysis: () => void;
}

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

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  isCsvMode,
  loading,
  error,
  activeResult,
  completedActions,
  onToggleAction,
  onExportReport,
  onRetryAnalysis
}) => {
  return (
    <div className="flex-1 p-6 flex flex-col justify-between bg-black/10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f293d] pb-4 mb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-fifa-gold-400" />
            <h3 className="font-extrabold text-white text-md tracking-tight uppercase">
              {isCsvMode ? "AI Operational Analytics" : "AI Operational Copilot"}
            </h3>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-fifa-gold-950/40 text-fifa-gold-400 border border-fifa-gold-900/30 font-sans uppercase w-fit">
            {isCsvMode ? "Workflow Step 2: AI Dataset Analytics" : "Workflow Step 2: AI Crowd Risk Analysis"}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Export Action */}
          {activeResult && (
            <button
              onClick={onExportReport}
              aria-label="Export generated AI response report as JSON file"
              className="flex items-center space-x-1.5 text-[10px] font-bold text-sky-400 hover:text-sky-300 border border-sky-950 px-2.5 py-1 rounded-lg bg-sky-950/20 transition-all font-sans"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export AI Report</span>
            </button>
          )}
        </div>
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
            <ErrorState message={error} onRetry={onRetryAnalysis} />
          </motion.div>
        ) : activeResult ? (
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
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
                  {isCsvMode ? "Parsed Dataset AI Synthesis" : "Advisory Risk Mitigation"}
                </span>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getRiskBadgeColor(activeResult.riskLevel)}`}>
                    {activeResult.riskLevel} Risk
                  </span>
                  {activeResult.priority && (
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getPriorityBadgeColor(activeResult.priority)}`}>
                      Priority: {activeResult.priority}
                    </span>
                  )}
                </div>
              </div>

              <ConfidenceIndicator confidence={activeResult.confidence} size="md" />
            </div>

            {/* Summary Description */}
            <div className="text-xs text-gray-300 leading-relaxed font-medium">
              {activeResult.summary}
            </div>

            {/* Suggested Actions Checklist */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-sans">Recommended Actions Checklist</span>
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {activeResult.recommendedActions.map((action, idx) => {
                  const isDone = !!completedActions[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => onToggleAction(idx)}
                      aria-label={`Mark task ${idx + 1}: ${action} as ${isDone ? 'incomplete' : 'complete'}`}
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
            <AIReasoningPanel reasoning={activeResult.reasoning} />

            {/* Impact Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#1f293d]/50 pt-4 text-xs">
              <div className="p-3 bg-fifa-green-950/10 border border-fifa-green-900/20 rounded-xl space-y-1">
                <span className="text-gray-500 font-bold uppercase text-[8px] tracking-wider flex items-center font-sans">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-fifa-green-400" />
                  Projected Impact
                </span>
                <span className="text-fifa-green-400 font-bold block leading-relaxed">{activeResult.expectedImpact}</span>
              </div>

              {activeResult.estimatedQueueReduction && (
                <div className="p-3 bg-sky-950/10 border border-sky-900/20 rounded-xl space-y-1">
                  <span className="text-gray-500 font-bold uppercase text-[8px] tracking-wider flex items-center font-sans">
                    <Clock className="w-3.5 h-3.5 mr-1 text-sky-400" />
                    Queue reduction
                  </span>
                  <span className="text-sky-400 font-bold block leading-relaxed">{activeResult.estimatedQueueReduction}</span>
                </div>
              )}
            </div>

            {/* Audit Metadata */}
            {(activeResult.analysisId || activeResult.analysisTimestamp) && (
              <div className="text-[8px] text-gray-600 flex justify-between items-center border-t border-[#1f293d]/30 pt-2.5 font-mono">
                <span>ID: {activeResult.analysisId}</span>
                <span>UTC: {activeResult.analysisTimestamp}</span>
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
  );
};
