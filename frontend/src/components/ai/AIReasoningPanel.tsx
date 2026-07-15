import React, { memo } from 'react';
import { AlertCircle } from 'lucide-react';

interface AIReasoningPanelProps {
  reasoning: string[];
}

export const AIReasoningPanel: React.FC<AIReasoningPanelProps> = memo(({ reasoning }) => {
  return (
    <div className="p-4 bg-[#121826]/85 rounded-xl border border-[#1f293d] space-y-3 text-xs shadow-inner">
      <div className="flex items-center space-x-2 text-fifa-gold-400 font-bold uppercase tracking-widest text-[9px] font-sans">
        <AlertCircle className="w-4 h-4 animate-pulse" />
        <span>Explainable AI Reasoning (Why this was recommended)</span>
      </div>
      <div className="space-y-2.5">
        {reasoning.map((item, index) => (
          <div key={index} className="flex items-start space-x-2 bg-black/10 p-2.5 rounded-lg border border-[#1f293d]/20 transition-all hover:bg-[#121826]/30">
            <span className="px-1.5 py-0.5 rounded bg-fifa-gold-950/50 border border-fifa-gold-900/40 text-fifa-gold-400 font-extrabold text-[9px] uppercase tracking-wide flex-shrink-0 mt-0.5">
              Reason {index + 1}
            </span>
            <p className="text-gray-300 font-medium leading-relaxed text-[11px]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
