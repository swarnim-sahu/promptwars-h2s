import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Landmark, ShieldCheck, Languages } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { value: '80,000+', label: 'Spectators Managed', desc: 'Predictive routing and crowd safety metrics.', icon: ShieldCheck, color: 'text-fifa-green-400 border-fifa-green-900/30 bg-fifa-green-950/10' },
    { value: '24/7', label: 'Operations Hotspots Tracked', desc: 'Telemetry monitored from gates to seatingstands.', icon: Landmark, color: 'text-fifa-gold-400 border-fifa-gold-900/30 bg-fifa-gold-950/10' },
    { value: '3', label: 'PA Translation Channels', desc: 'Instant EN, ES, FR announcer safety transcripts.', icon: Languages, color: 'text-sky-400 border-sky-900/30 bg-sky-950/10' },
    { value: '< 2s', label: 'AI Directive Latency', desc: 'Real-time bottleneck diagnosis & recommendations.', icon: Activity, color: 'text-rose-400 border-rose-900/30 bg-rose-950/10' },
  ];

  return (
    <section id="stats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`p-6 rounded-2xl border ${stat.color} flex flex-col justify-between items-center text-center space-y-4 shadow-xl hover:scale-[1.02] transition-transform`}
              >
                <div className="p-3 bg-black/30 rounded-xl">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl font-extrabold tracking-tight text-white">{stat.value}</span>
                  <span className="block text-sm font-bold text-gray-200">{stat.label}</span>
                  <span className="block text-xs text-gray-500 font-medium">{stat.desc}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
