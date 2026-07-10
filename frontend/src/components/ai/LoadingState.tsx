import React from 'react';
import { Cpu } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "AI Advisor is evaluating operational data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-[#1f293d] bg-[#121826]/30 rounded-2xl space-y-4 min-h-[200px]">
      <div className="relative flex items-center justify-center">
        {/* Pulsing glow rings */}
        <div className="absolute w-12 h-12 rounded-full border border-fifa-green-500/20 animate-ping" />
        <div className="absolute w-8 h-8 rounded-full border border-fifa-gold-500/20 animate-ping" style={{ animationDelay: '0.5s' }} />
        
        {/* Core rotating logo */}
        <div className="p-3 bg-black/40 rounded-full border border-[#1f293d] animate-[spin_3s_linear_infinite] relative z-10 text-fifa-gold-400">
          <Cpu className="w-6 h-6" />
        </div>
      </div>
      <span className="text-xs font-semibold text-gray-400 tracking-wide">{message}</span>
    </div>
  );
};
