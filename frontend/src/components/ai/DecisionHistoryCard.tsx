import React from 'react';
import { Clock, FileCheck2 } from 'lucide-react';
import type { DecisionHistory } from '../../types';

interface DecisionHistoryCardProps {
  history: DecisionHistory[];
}

export const DecisionHistoryCard: React.FC<DecisionHistoryCardProps> = ({ history }) => {
  const getOutcomeStyle = (accepted: boolean | null) => {
    if (accepted === true) return 'bg-emerald-950/20 border-emerald-800 text-emerald-400';
    if (accepted === false) return 'bg-rose-950/20 border-rose-800 text-rose-400';
    return 'bg-gray-950/20 border-gray-800 text-gray-400';
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/40 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2 border-b border-[#1f293d] pb-4">
        <FileCheck2 className="w-5 h-5 text-fifa-gold-400" />
        <h3 className="font-extrabold text-white text-lg tracking-tight">Audit Log & Decision History</h3>
      </div>

      {/* Log Feed */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {history.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-600">
            No decisions logged yet. Execute recommendations to populate audit logs.
          </div>
        ) : (
          history.map((log) => (
            <div
              key={log.id}
              className="p-4 bg-black/15 rounded-xl border border-[#1f293d]/50 text-xs space-y-3"
            >
              {/* Top Details */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-white leading-snug">{log.situationSummary}</h4>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>Confidence: {log.confidence}%</span>
                  </div>
                </div>

                {/* Outcome Badge */}
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${getOutcomeStyle(log.accepted)}`}>
                  {log.accepted === true ? 'Accepted' : log.accepted === false ? 'Declined' : 'Pending'}
                </span>
              </div>

              {/* Recommendation details */}
              <div className="text-gray-400 border-l border-[#1f293d] pl-3 leading-relaxed py-0.5">
                <span className="font-semibold text-white block mb-0.5">Directive Suggested:</span>
                "{log.aiRecommendation}"
              </div>

              {/* Execution Outcome */}
              {(log.actualOutcome || log.organizerNotes) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0a0d16] p-3 rounded-lg border border-[#1f293d]/30 text-[11px] leading-relaxed">
                  {log.actualOutcome && (
                    <div>
                      <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Actual Outcome</span>
                      <span className="text-fifa-green-400 font-semibold">{log.actualOutcome}</span>
                    </div>
                  )}
                  {log.organizerNotes && (
                    <div>
                      <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Organizer Notes</span>
                      <span className="text-gray-300 font-medium">{log.organizerNotes}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
};
