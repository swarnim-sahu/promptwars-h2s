import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Train, Star, MessageSquare } from 'lucide-react';

export const FanDashboard: React.FC = () => {
  const widgets = [
    { title: 'Interactive Transit Planner', desc: 'Real-time routing suggestions to dynamic gate entry points.', icon: Train },
    { title: 'In-Stadium Seat Assistance', desc: 'Step-by-step navigation to your specific gate, tier, and seat row.', icon: Compass },
    { title: 'Wait-Time Predictor', desc: 'Gemini-powered forecasting for concessions and restroom queues.', icon: Star },
    { title: 'Fan Assistant AI Chat', desc: 'Ask multilingual questions about schedules, regulations, or emergency guidance.', icon: MessageSquare },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-[#1f293d] pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight">Fan Dashboard</h1>
        <p className="text-gray-400 mt-1">Real-time guidance, alerts, and navigation tools for match attendees.</p>
      </div>

      {/* Main Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget, i) => {
          const Icon = widget.icon;
          return (
            <motion.div
              key={widget.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="p-6 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 bg-fifa-green-950/40 text-fifa-green-400 rounded-lg w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">{widget.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{widget.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1f293d]/50">
                <span className="text-xs text-fifa-green-500 font-semibold uppercase tracking-wider">Module Sandbox</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Demo Section */}
      <div className="rounded-xl border border-[#1f293d] bg-[#121826]/20 p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Interactive Fan Sandbox</h2>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          This UI dashboard will eventually connect to real-time maps and the Google Gemini API to support live routing.
        </p>
      </div>
    </div>
  );
};
