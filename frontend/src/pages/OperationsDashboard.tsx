import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Flame, MapPin } from 'lucide-react';

export const OperationsDashboard: React.FC = () => {
  const monitors = [
    { title: 'AI Crowd Density Monitor', desc: 'Predictive bottleneck warning system for gates and concourses.', icon: Eye, status: 'Active' },
    { title: 'Emergency Dispatch Coordinator', desc: 'Automated coordination between onsite staff and regional paramedics.', icon: Shield, status: 'Standby' },
    { title: 'Stadium Thermal Comfort', desc: 'HVAC energy balancing and environmental temperature micro-tracking.', icon: Flame, status: 'Active' },
    { title: 'Staff and Resource Allocator', desc: 'Positioning of security personnel and volunteers based on fan traffic.', icon: MapPin, status: 'Active' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-[#1f293d] pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight">Operations Command Center</h1>
        <p className="text-gray-400 mt-1">Real-time telemetry, threat analysis, crowd mapping, and staff dispatch.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Console placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Active Operations Feeds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monitors.map((mon, i) => {
              const Icon = mon.icon;
              return (
                <motion.div
                  key={mon.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="p-5 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-fifa-gold-950/40 text-fifa-gold-400 rounded-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {mon.status}
                      </span>
                    </div>
                    <h3 className="font-bold">{mon.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{mon.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live system state sidebar placeholder */}
        <div className="rounded-xl border border-[#1f293d] bg-[#121826]/20 p-6 space-y-6">
          <h2 className="text-xl font-bold tracking-tight">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Total Stadium Population</span>
              <span className="font-semibold">68,450 / 72,000</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="bg-gradient-to-r from-fifa-green-500 to-fifa-gold-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <div className="border-t border-[#1f293d] pt-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Primary Server Status</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Gemini Dispatch Model</span>
                <span className="text-fifa-gold-400 font-bold">READY (SANDBOX)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
