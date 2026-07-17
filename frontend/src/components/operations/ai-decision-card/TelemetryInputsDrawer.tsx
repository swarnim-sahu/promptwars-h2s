import React from 'react';
import { Sliders, Lock, RotateCcw, Sparkles } from 'lucide-react';

interface TelemetryInputsDrawerProps {
  isCsvMode: boolean;
  onResetManual?: () => void;
  gate: string;
  setGate: (val: string) => void;
  occupancy: number;
  setOccupancy: (val: number) => void;
  entryRate: number;
  setEntryRate: (val: number) => void;
  weather: string;
  setWeather: (val: string) => void;
  volunteers: number;
  setVolunteers: (val: number) => void;
  medicalIncidents: number;
  setMedicalIncidents: (val: number) => void;
  transportDelay: boolean;
  setTransportDelay: (val: boolean) => void;
  loading: boolean;
  onExecuteAI: () => void;
}

export const TelemetryInputsDrawer: React.FC<TelemetryInputsDrawerProps> = ({
  isCsvMode,
  onResetManual,
  gate,
  setGate,
  occupancy,
  setOccupancy,
  entryRate,
  setEntryRate,
  weather,
  setWeather,
  volunteers,
  setVolunteers,
  medicalIncidents,
  setMedicalIncidents,
  transportDelay,
  setTransportDelay,
  loading,
  onExecuteAI
}) => {
  return (
    <div className="w-full lg:w-[240px] p-5 bg-[#121826]/60 border-b lg:border-b-0 lg:border-r border-[#1f293d] space-y-4 flex-shrink-0 flex flex-col justify-between relative">
      
      {/* Lock Overlay for CSV Mode */}
      {isCsvMode && (
        <div className="absolute inset-0 bg-[#0c1220]/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-10 space-y-3">
          <Lock className="w-8 h-8 text-fifa-gold-500 animate-pulse" aria-hidden="true" />
          <div className="space-y-1">
            <span className="block text-xs font-bold text-white">CSV Analytics Active</span>
            <span className="block text-[10px] text-gray-500 leading-normal font-medium">Manual parameters are locked during log review.</span>
          </div>
          {onResetManual && (
            <button
              onClick={onResetManual}
              aria-label="Unlock manual parameters controls"
              className="flex items-center space-x-1 border border-fifa-gold-900/30 hover:border-fifa-gold-500 bg-fifa-gold-950/20 text-fifa-gold-400 font-bold text-[10px] px-3.5 py-1.5 rounded-xl transition-all focus:outline-none focus:ring-1 focus:ring-fifa-gold-500"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Manual Controls</span>
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-2 border-b border-[#1f293d] pb-2.5">
          <Sliders className="w-4 h-4 text-fifa-gold-400" aria-hidden="true" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">Telemetry Inputs</span>
        </div>

        {/* Select Gate */}
        <div className="space-y-1">
          <label htmlFor="gate-selector" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Gate Sector</label>
          <select
            id="gate-selector"
            value={gate}
            onChange={(e) => setGate(e.target.value)}
            aria-label="Stadium gate selector option"
            className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
          >
            <option value="Gate A">Gate A (East Stand)</option>
            <option value="Gate B">Gate B (North Stand)</option>
            <option value="Gate C">Gate C (West Stand)</option>
            <option value="Gate D">Gate D (South Stand)</option>
          </select>
        </div>

        {/* Occupancy Percentage */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
            <label htmlFor="occupancy-slider">Occupancy</label>
            <span className="text-white font-mono">{occupancy}%</span>
          </div>
          <input
            id="occupancy-slider"
            type="range"
            min="0"
            max="100"
            value={occupancy}
            onChange={(e) => setOccupancy(Number(e.target.value))}
            aria-label="Telemetry occupancy percentage slider"
            className="w-full accent-fifa-gold-500 focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 rounded"
          />
        </div>

        {/* Entry Rate */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
            <label htmlFor="entry-rate-slider">Entry rate</label>
            <span className="text-white font-mono">{entryRate} /min</span>
          </div>
          <input
            id="entry-rate-slider"
            type="range"
            min="0"
            max="50"
            value={entryRate}
            onChange={(e) => setEntryRate(Number(e.target.value))}
            aria-label="Telemetry turnstile entry rate slider"
            className="w-full accent-fifa-gold-500 focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 rounded"
          />
        </div>

        {/* Weather */}
        <div className="space-y-1">
          <label htmlFor="weather-selector" className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Weather Alert</label>
          <select
            id="weather-selector"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            aria-label="Weather situation selector option"
            className="w-full px-2.5 py-1.5 rounded-lg border border-[#1c263c] bg-black/40 text-xs text-white focus:outline-none focus:border-fifa-gold-500"
          >
            <option value="Clear sky">Clear Sky</option>
            <option value="Rain expected">Rain Expected</option>
            <option value="Heavy Storm Warning">Heavy Storm Warning</option>
            <option value="High Heat Hazard">High Heat Hazard</option>
          </select>
        </div>

        {/* Volunteers count */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
            <label htmlFor="volunteers-slider">Volunteers</label>
            <span className="text-white font-mono">{volunteers} stewards</span>
          </div>
          <input
            id="volunteers-slider"
            type="range"
            min="0"
            max="25"
            value={volunteers}
            onChange={(e) => setVolunteers(Number(e.target.value))}
            aria-label="Volunteer staff count slider"
            className="w-full accent-fifa-gold-500 focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 rounded"
          />
        </div>

        {/* Medical Incidents count */}
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
            <label htmlFor="medical-slider">Medical logs</label>
            <span className="text-white font-mono">{medicalIncidents} reports</span>
          </div>
          <input
            id="medical-slider"
            type="range"
            min="0"
            max="5"
            value={medicalIncidents}
            onChange={(e) => setMedicalIncidents(Number(e.target.value))}
            aria-label="Medical incidents report slider"
            className="w-full accent-fifa-gold-500 focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 rounded"
          />
        </div>

        {/* Transport Delay */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-sans">Train/Bus Delay</span>
          <button
            role="switch"
            aria-checked={transportDelay}
            onClick={() => setTransportDelay(!transportDelay)}
            aria-label="Toggle train or bus delay status flag"
            className={`w-10 h-5 rounded-full p-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-fifa-gold-500 ${
              transportDelay ? 'bg-fifa-gold-500 text-black' : 'bg-[#1c263c]'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${
              transportDelay ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Run analysis CTA button */}
      <button
        onClick={onExecuteAI}
        disabled={loading}
        aria-label="Query Gemini AI models for crowd evaluation report"
        className="w-full flex items-center justify-center space-x-1.5 bg-gradient-to-r from-fifa-gold-600 to-fifa-gold-700 hover:from-fifa-gold-500 hover:to-fifa-gold-600 text-black font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-glow-gold/10 hover:shadow-glow-gold/30 disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-fifa-gold-500"
      >
        <Sparkles className="w-4.5 h-4.5 animate-pulse" aria-hidden="true" />
        <span>Execute Gemini AI</span>
      </button>
    </div>
  );
};
