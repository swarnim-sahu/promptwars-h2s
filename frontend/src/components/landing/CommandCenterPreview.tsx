import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, Cpu, TrendingUp, Sparkles } from 'lucide-react';

export const CommandCenterPreview: React.FC = () => {
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const alerts = [
    { id: '1', level: 'danger', msg: 'Gate B Bottleneck detected. Processing rate down 35%.', time: '14:32', loc: 'North Entrance' },
    { id: '2', level: 'warning', msg: 'Elevator 4 out of service. Rerouting accessibility paths.', time: '14:28', loc: 'Section 104' },
    { id: '3', level: 'info', msg: 'Sustainability goal: Water recycling threshold hit (95%).', time: '14:15', loc: 'Concourse A' },
  ];

  const gates = [
    { name: 'Gate A (East)', value: 45, color: 'bg-emerald-500' },
    { name: 'Gate B (North)', value: 88, color: 'bg-red-500' },
    { name: 'Gate C (West)', value: 30, color: 'bg-emerald-500' },
    { name: 'Gate D (South)', value: 65, color: 'bg-yellow-500' },
  ];

  return (
    <section id="preview" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-fifa-gold-500 bg-fifa-gold-950/20 px-3 py-1.5 rounded-full border border-fifa-gold-800/40">
            Live Preview Interface
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Command Center Telemetry Console
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Experience the mock administrative control panel configured to monitor and direct operations inside the stadium.
          </p>
        </div>

        {/* Mock Command Center Console */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-[#1f293d] bg-[#0c1220]/90 shadow-2xl p-6 space-y-6 relative overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#1f293d] pb-4 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ef4444]">Live Command Stream</span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-gray-400 font-medium">FIFA World Cup Match 42 Sandbox</span>
            </div>
            
            <div className="text-xs font-semibold text-gray-400 font-mono">
              System Time: {liveTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Crowd Density & AI Recommendation */}
            <div className="lg:col-span-4 space-y-6 flex flex-col">
              
              {/* Card: Crowd Density */}
              <div className="p-5 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex-1 space-y-4">
                <div className="flex items-center space-x-2 text-fifa-green-400">
                  <Users className="w-5 h-5" />
                  <h3 className="font-bold text-sm text-white">Crowd Flow Density</h3>
                </div>
                <div className="space-y-3">
                  {gates.map((gate) => (
                    <div key={gate.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">{gate.name}</span>
                        <span className="font-semibold text-white">{gate.value}% Capacity</span>
                      </div>
                      <div className="w-full bg-[#1c263c] h-1.5 rounded-full overflow-hidden">
                        <div className={`${gate.color} h-1.5 rounded-full`} style={{ width: `${gate.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card: AI Recommendation */}
              <div className="p-5 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex-1 space-y-3">
                <div className="flex items-center space-x-2 text-[#ffd700]">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-bold text-sm text-white">Gemini Advisor Routing</h3>
                </div>
                <div className="p-3 bg-fifa-green-950/20 border border-fifa-green-900/30 rounded-lg text-xs leading-relaxed text-fifa-green-400 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-fifa-gold-400" />
                  <span>
                    <strong>Advisory:</strong> Heavy queue detected at Gate B. Automatically updating smart transit screens in Transit Zone 3 to display route suggestions towards Gate A (East).
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider pt-2">
                  <span>Recommendation Index</span>
                  <span className="text-fifa-gold-400 flex items-center"><TrendingUp className="w-3.5 h-3.5 mr-1" />98.4% Confidence</span>
                </div>
              </div>

            </div>

            {/* Center Column: Heatmap and Stadium Map */}
            <div className="lg:col-span-5 p-5 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[300px]">
              <div className="absolute top-4 left-4 flex items-center space-x-1.5 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-fifa-gold-500" />
                <span>Heatmap Overlay</span>
              </div>

              {/* Heatmap Seating Chart Layout mockup */}
              <div className="w-full flex-1 flex items-center justify-center p-4">
                <svg width="240" height="180" viewBox="0 0 240 180" className="filter drop-shadow-[0_0_12px_rgba(217,160,13,0.15)]">
                  {/* Seating Sectors mapped in gradients representing heatmap density */}
                  {/* Sector A (High Density) */}
                  <path d="M 120 15 A 100 70 0 0 1 200 55 L 180 65 A 70 45 0 0 0 120 35 Z" fill="#ef4444" opacity="0.8" />
                  {/* Sector B (Medium Density) */}
                  <path d="M 200 55 A 100 70 0 0 1 220 90 L 195 90 A 70 45 0 0 0 180 65 Z" fill="#f59e0b" opacity="0.8" />
                  {/* Sector C (Low Density) */}
                  <path d="M 220 90 A 100 70 0 0 1 200 125 L 180 115 A 70 45 0 0 0 195 90 Z" fill="#10b981" opacity="0.8" />
                  <path d="M 200 125 A 100 70 0 0 1 120 165 L 120 145 A 70 45 0 0 0 180 115 Z" fill="#10b981" opacity="0.8" />
                  
                  {/* Left Side Seating */}
                  <path d="M 120 15 A 100 70 0 0 0 40 55 L 60 65 A 70 45 0 0 1 120 35 Z" fill="#ef4444" opacity="0.8" />
                  <path d="M 40 55 A 100 70 0 0 0 20 90 L 45 90 A 70 45 0 0 1 60 65 Z" fill="#f59e0b" opacity="0.8" />
                  <path d="M 20 90 A 100 70 0 0 0 40 125 L 60 115 A 70 45 0 0 1 45 90 Z" fill="#10b981" opacity="0.8" />
                  <path d="M 40 125 A 100 70 0 0 0 120 165 L 120 145 A 70 45 0 0 1 60 115 Z" fill="#10b981" opacity="0.8" />

                  {/* Arena pitch */}
                  <rect x="90" y="70" width="60" height="40" rx="3" stroke="#22c55e" strokeWidth="1" fill="#052e16" />
                  <ellipse cx="120" cy="90" rx="10" ry="10" stroke="#22c55e" strokeWidth="1" />
                </svg>
              </div>

              {/* Legends */}
              <div className="flex space-x-6 text-[10px] text-gray-500 font-semibold uppercase">
                <span className="flex items-center"><span className="w-2 h-2 rounded bg-red-500 mr-1.5" />Congested (&gt;85%)</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded bg-yellow-500 mr-1.5" />Moderate (50-80%)</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded bg-emerald-500 mr-1.5" />Optimal (&lt;50%)</span>
              </div>
            </div>

            {/* Right Column: Live Alerts Feed */}
            <div className="lg:col-span-3 p-5 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex flex-col space-y-4">
              <div className="flex items-center space-x-2 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-sm text-white">Critical Incident Alerts</h3>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-[#161d2f]/70 border-l-2 border-red-500 rounded text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                      <span className="text-[#ef4444] uppercase tracking-wider">{alert.loc}</span>
                      <span>{alert.time}</span>
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed text-[11px]">{alert.msg}</p>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-center text-gray-500 pt-2 border-t border-[#1f293d]/50 uppercase font-bold tracking-widest">
                Automatic Dispatch Active
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
