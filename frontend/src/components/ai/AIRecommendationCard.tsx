import React, { useState } from 'react';
import { Cpu, Sparkles, Check, X } from 'lucide-react';
import type { AIResponse, RiskLevel } from '../../types';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { AIReasoningPanel } from './AIReasoningPanel';
import { AnnouncementPreview } from './AnnouncementPreview';

interface AIRecommendationCardProps {
  response: AIResponse;
  onDecision: (accepted: boolean, notes: string) => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ response, onDecision }) => {
  const [organizerNotes, setOrganizerNotes] = useState('');
  const [actionsCompleted, setActionsCompleted] = useState<Record<number, boolean>>({});

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'Critical': return 'bg-red-950/20 border-red-800 text-red-400';
      case 'High': return 'bg-orange-950/20 border-orange-800 text-orange-400';
      case 'Medium': return 'bg-yellow-950/20 border-yellow-800 text-yellow-400';
      default: return 'bg-emerald-950/20 border-emerald-800 text-emerald-400';
    }
  };

  const toggleAction = (idx: number) => {
    setActionsCompleted((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#0c1220]/90 shadow-2xl space-y-6">
      
      {/* Title & Metadata */}
      <div className="flex items-start justify-between gap-6 border-b border-[#1f293d] pb-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-fifa-gold-400" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Explainable AI Core</span>
          </div>
          <h3 className="text-lg font-extrabold text-white leading-snug">Operations Directive</h3>
          <div className="flex space-x-2 pt-1">
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getRiskBadge(response.riskLevel)}`}>
              {response.riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Confidence Ring */}
        <ConfidenceIndicator confidence={response.confidence} size="md" />
      </div>

      {/* Summary */}
      <div className="text-xs text-gray-300 leading-relaxed font-medium">
        {response.summary}
      </div>

      {/* Suggested Actions Checklist */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recommended Procedures</span>
        <div className="space-y-2">
          {response.recommendedActions.map((action, i) => {
            const isDone = !!actionsCompleted[i];
            return (
              <button
                key={i}
                onClick={() => toggleAction(i)}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start space-x-3 ${
                  isDone
                    ? 'bg-fifa-green-950/10 border-fifa-green-800 text-fifa-green-400'
                    : 'bg-black/10 border-[#1f293d] hover:border-[#2a3952] text-gray-300'
                }`}
              >
                <span className={`w-4.5 h-4.5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold ${
                  isDone ? 'bg-fifa-green-600 text-white' : 'border border-gray-600 text-gray-500'
                }`}>
                  {isDone ? '✓' : i + 1}
                </span>
                <span className={isDone ? 'line-through text-gray-500' : ''}>{action}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explainable AI Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AIReasoningPanel reasoning={response.reasoning} />
        {response.announcement && <AnnouncementPreview announcement={response.announcement} />}
      </div>

      {/* Expected Impact */}
      <div className="p-3.5 bg-fifa-green-950/10 border border-fifa-green-900/20 rounded-xl text-xs flex justify-between items-center">
        <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-fifa-green-400" />
          Projected Impact
        </span>
        <span className="text-fifa-green-400 font-bold text-right max-w-[280px]">{response.expectedImpact}</span>
      </div>

      {/* Organizer Decision Actions Outcome Log */}
      <div className="border-t border-[#1f293d] pt-5 space-y-4">
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Organizer Feedback / Log Notes</label>
          <textarea
            value={organizerNotes}
            onChange={(e) => setOrganizerNotes(e.target.value)}
            placeholder="Add operational notes, dispatch delays, or outcome notes..."
            className="w-full h-16 p-3 bg-black/20 border border-[#1f293d] rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold-500 transition-colors"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              onDecision(true, organizerNotes);
              setOrganizerNotes('');
            }}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-fifa-green-600 to-fifa-green-700 hover:from-fifa-green-500 hover:to-fifa-green-600 text-white font-bold text-xs py-3 rounded-xl shadow-glow-green hover:shadow-glow-green/80 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Accept & Execute Directive</span>
          </button>
          <button
            onClick={() => {
              onDecision(false, organizerNotes);
              setOrganizerNotes('');
            }}
            className="flex-1 flex items-center justify-center space-x-2 bg-[#121826]/80 border border-rose-900/30 hover:bg-rose-950/10 text-rose-400 hover:text-rose-300 font-bold text-xs py-3 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
            <span>Decline Directive</span>
          </button>
        </div>
      </div>

    </div>
  );
};
