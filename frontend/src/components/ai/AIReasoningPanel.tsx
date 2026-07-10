import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AIReasoningPanelProps {
  reasoning: string[];
}

export const AIReasoningPanel: React.FC<AIReasoningPanelProps> = ({ reasoning }) => {
  return (
    <div className="p-4 bg-[#121826]/80 rounded-xl border border-[#1f293d] space-y-2 text-xs">
      <div className="flex items-center space-x-2 text-fifa-gold-400 font-bold uppercase tracking-widest text-[9px]">
        <AlertCircle className="w-4 h-4" />
        <span>Explainable AI Reasoning Basis</span>
      </div>
      <ul className="space-y-1.5 list-disc pl-4 text-gray-300 font-medium leading-relaxed">
        {reasoning.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
