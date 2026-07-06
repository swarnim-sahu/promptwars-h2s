import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, AlertTriangle, Leaf } from 'lucide-react';

export const KPIsGrid: React.FC = () => {
  
  // Custom count-up state hook mockups
  const [occupancy, setOccupancy] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const [alerts, setAlerts] = useState(0);
  const [ecoRate, setEcoRate] = useState(0);

  useEffect(() => {
    // Animate counters on load
    const duration = 1000; // 1s
    const steps = 30;
    const intervalTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setOccupancy(Math.floor((68450 / steps) * step));
      setWaitTime(Math.floor((8 / steps) * step));
      setAlerts(Math.floor((2 / steps) * step));
      setEcoRate(parseFloat(((18.4 / steps) * step).toFixed(1)));

      if (step >= steps) {
        clearInterval(timer);
        setOccupancy(68450);
        setWaitTime(8);
        setAlerts(2);
        setEcoRate(18.4);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const kpis = [
    { title: 'Live Occupancy', value: occupancy.toLocaleString(), max: ' / 72k Max', icon: Users, color: 'text-fifa-green-400 border-fifa-green-900/30' },
    { title: 'Avg Entry Wait Time', value: `${waitTime}m`, max: ' (Peak: 14m)', icon: Clock, color: 'text-fifa-gold-400 border-fifa-gold-900/30' },
    { title: 'Active Safety Alerts', value: alerts, max: ' Urgent Incident', icon: AlertTriangle, color: 'text-rose-400 border-rose-900/30' },
    { title: 'Sustainability Savings', value: `${ecoRate}%`, max: ' Power Draw Offset', icon: Leaf, color: 'text-emerald-400 border-emerald-900/30' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={`p-5 rounded-2xl border bg-[#121826]/40 flex items-center justify-between shadow-lg relative overflow-hidden ${kpi.color}`}
          >
            {/* Glowing card highlight */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-x-4 -translate-y-4 blur-md" />
            
            <div className="space-y-1">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">{kpi.title}</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold text-white tracking-tight">{kpi.value}</span>
                <span className="text-[10px] text-gray-500 font-semibold">{kpi.max}</span>
              </div>
            </div>
            
            <div className="p-3 bg-black/20 rounded-xl">
              <Icon className="w-5 h-5" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
