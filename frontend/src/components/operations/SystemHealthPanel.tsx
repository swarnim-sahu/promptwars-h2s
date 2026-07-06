import React from 'react';
import { mockSystemHealth } from '../../shared/mockData';
import { Activity } from 'lucide-react';

export const SystemHealthPanel: React.FC = () => {
  const getStatusBulb = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-emerald-500 shadow-glow-green';
      case 'warning': return 'bg-yellow-500 shadow-glow-gold';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-400 font-bold';
      case 'warning': return 'text-yellow-400 font-bold';
      case 'critical': return 'text-red-400 font-bold';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/40 shadow-lg space-y-4 flex flex-col justify-between h-full min-h-[300px]">
      
      {/* Header */}
      <div className="flex items-center space-x-2 border-b border-[#1f293d] pb-4">
        <Activity className="w-5 h-5 text-fifa-green-400" />
        <h3 className="font-extrabold text-white text-lg tracking-tight">System Infrastructure Health</h3>
      </div>

      {/* Grid of statuses */}
      <div className="space-y-3 flex-1 justify-center flex flex-col">
        {mockSystemHealth.map((sys) => (
          <div key={sys.name} className="flex items-center justify-between p-2.5 rounded-xl bg-black/10 border border-[#1f293d]/30 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className={`w-2 h-2 rounded-full ${getStatusBulb(sys.status)}`} />
              <span className="font-bold text-gray-300">{sys.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 font-mono text-[10px]">Ping: {sys.latency}</span>
              <span className={`uppercase font-bold text-[10px] tracking-wider ${getStatusText(sys.status)}`}>
                {sys.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest border-t border-[#1f293d]/50">
        AI Gateway Diagnostics Online
      </div>

    </div>
  );
};
