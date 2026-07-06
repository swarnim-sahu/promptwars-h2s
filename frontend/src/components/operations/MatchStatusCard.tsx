import React, { useEffect, useState } from 'react';
import { Shield, Clock, MapPin, Wind } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MatchStatusCard: React.FC = () => {
  const { theme } = useApp();
  const [matchMinutes, setMatchMinutes] = useState(65);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Tick current clock time
    const timeTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simulate game match minutes progression
    const matchTimer = setInterval(() => {
      setMatchMinutes((prev) => (prev < 90 ? prev + 1 : 90));
    }, 15000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(matchTimer);
    };
  }, []);

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#121826]/40 border-[#1f293d] shadow-glow-green/5' 
        : 'bg-white border-gray-200 shadow-md'
    } flex flex-col md:flex-row items-center justify-between gap-6`}>
      
      {/* Left: Match Details */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-fifa-green-950/20 text-fifa-green-500 rounded-xl border border-fifa-green-900/30">
          <Shield className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
              theme === 'dark' ? 'bg-fifa-gold-950 text-fifa-gold-400' : 'bg-amber-50 text-amber-800'
            }`}>
              Group Stage - Match 42
            </span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">• LIVE FEED</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
            Argentina <span className="text-fifa-gold-500">vs</span> Spain
          </h2>
        </div>
      </div>

      {/* Center: Live Match Status Display */}
      <div className="flex items-center space-x-6 bg-black/10 px-6 py-3 rounded-2xl border border-[#1f293d]/50">
        <div className="text-right">
          <span className="block text-2xl font-black tracking-widest text-white">1 - 1</span>
        </div>
        <div className="h-8 w-px bg-[#1f293d]" />
        <div className="flex items-center space-x-2 text-fifa-green-400 font-mono text-sm font-semibold">
          <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{matchMinutes}'</span>
        </div>
      </div>

      {/* Right: Environmental parameters */}
      <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs text-gray-400 font-medium">
        <div className="flex items-center space-x-1.5">
          <MapPin className="w-4 h-4 text-fifa-gold-500" />
          <span>MetLife Stadium, NJ</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Wind className="w-4 h-4 text-sky-400" />
          <span>Temp: 24°C • Wind: 12 km/h</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#121826] px-3 py-1.5 rounded-lg border border-[#1f293d]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-gray-300 font-semibold">{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

    </div>
  );
};
