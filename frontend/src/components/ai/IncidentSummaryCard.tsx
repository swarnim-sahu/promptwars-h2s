import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';
import type { AIResponse } from '../../types';

interface IncidentSummaryCardProps {
  response: AIResponse;
}

export const IncidentSummaryCard: React.FC<IncidentSummaryCardProps> = ({ response }) => {
  return (
    <div className="p-5 rounded-2xl border border-rose-900/30 bg-rose-950/5 shadow-lg space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-rose-950 pb-3">
        <div className="flex items-center space-x-2 text-rose-400">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <h3 className="font-extrabold text-white text-md tracking-tight">Active Incident Synthesizer</h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-400 uppercase">
          AI Summarized
        </span>
      </div>

      {/* Summary Content */}
      <div className="space-y-3 text-xs leading-relaxed text-gray-300">
        <p className="font-medium text-white">{response.summary}</p>
        <div className="flex justify-between items-center bg-black/20 p-2.5 rounded-lg border border-[#1f293d]/50">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center">
            <FileText className="w-3.5 h-3.5 mr-1" /> Estimated Impact
          </span>
          <span className="text-rose-400 font-bold">{response.expectedImpact}</span>
        </div>
      </div>

    </div>
  );
};
