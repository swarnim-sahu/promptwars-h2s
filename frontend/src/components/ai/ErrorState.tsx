import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "A connectivity boundary blocked the AI gateway query.", 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-rose-950 bg-rose-950/5 rounded-2xl space-y-4 min-h-[200px] text-center">
      <div className="p-3 bg-rose-950/20 text-rose-400 rounded-full border border-rose-800">
        <ShieldAlert className="w-6 h-6 animate-bounce" />
      </div>
      <div className="space-y-1">
        <span className="block text-xs font-bold text-white">AI Gateway Disrupted</span>
        <span className="block text-[11px] text-gray-400 leading-normal max-w-xs">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-1.5 bg-[#121826]/80 border border-[#1f293d] hover:bg-black/30 text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Handshake</span>
        </button>
      )}
    </div>
  );
};
