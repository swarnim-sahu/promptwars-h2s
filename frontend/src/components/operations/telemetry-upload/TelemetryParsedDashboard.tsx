import React from 'react';
import { 
  CheckCircle, 
  Users, 
  CloudSun, 
  FlameKindling, 
  Sparkles 
} from 'lucide-react';

interface TelemetryParsedDashboardProps {
  fileName: string;
  parsedStats: {
    totalRecords: number;
    averageOccupancy: number;
    averageEntryRate: number;
    totalVolunteers: number;
    weatherSummary: string;
    totalMedical: number;
    congestedGates: string[];
  };
  loading: boolean;
  onRunGeminiAnalysis: () => void;
}

export const TelemetryParsedDashboard: React.FC<TelemetryParsedDashboardProps> = ({
  fileName,
  parsedStats,
  loading,
  onRunGeminiAnalysis
}) => {
  return (
    <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
      
      {/* Stats Review Card */}
      <div className="p-5 border border-fifa-green-950 bg-fifa-green-950/5 rounded-2xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-fifa-green-950 pb-2">
          <CheckCircle className="w-4 h-4 text-fifa-green-500" />
          <span className="text-xs font-bold text-white uppercase tracking-tight">Telemetry Statistics Generated ({fileName})</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Total records</span>
            <span className="text-white text-md font-mono font-extrabold">{parsedStats.totalRecords}</span>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Average occupancy</span>
            <span className="text-white text-md font-mono font-extrabold">{parsedStats.averageOccupancy}%</span>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Average entry rate</span>
            <span className="text-white text-md font-mono font-extrabold">{parsedStats.averageEntryRate} /min</span>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Total volunteers</span>
            <span className="text-white text-md font-mono font-extrabold flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-gray-500" /> {parsedStats.totalVolunteers}
            </span>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Weather environments</span>
            <span className="text-white text-xs font-semibold truncate flex items-center">
              <CloudSun className="w-3.5 h-3.5 mr-1 text-sky-400" /> {parsedStats.weatherSummary}
            </span>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Medical reports</span>
            <span className="text-white text-md font-mono font-extrabold">{parsedStats.totalMedical}</span>
          </div>

          <div className="p-3 bg-black/20 rounded-xl border border-[#1f293d]/50 col-span-2 space-y-1">
            <span className="text-gray-500 text-[8px] font-bold uppercase tracking-wider block">Congestion hotspots</span>
            <span className="text-white text-xs font-bold truncate flex items-center">
              <FlameKindling className="w-3.5 h-3.5 mr-1 text-rose-500" />
              {parsedStats.congestedGates.length > 0 
                ? parsedStats.congestedGates.join(', ') 
                : 'None flagged (under 80% limit)'
              }
            </span>
          </div>

        </div>
      </div>

      {/* Analyze CTA button */}
      <div className="flex justify-end pt-1">
        <button
          onClick={onRunGeminiAnalysis}
          disabled={loading}
          className="flex items-center space-x-2 bg-gradient-to-r from-fifa-gold-500 to-fifa-gold-600 hover:from-fifa-gold-400 hover:to-fifa-gold-500 text-black font-extrabold text-xs px-6 py-3 rounded-xl shadow-glow-gold/15 hover:shadow-glow-gold/35 transition-all disabled:opacity-40"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>{loading ? "Generating Report..." : "Analyze Stats with Gemini AI"}</span>
        </button>
      </div>

    </div>
  );
};
