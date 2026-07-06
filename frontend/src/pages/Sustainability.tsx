import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Recycle, Trash } from 'lucide-react';

export const Sustainability: React.FC = () => {
  const metrics = [
    { title: 'Waste Sort AI Scanner', desc: 'Point your camera to instantly classify waste and find the nearest bin.', icon: Trash, progress: 'Ready' },
    { title: 'Eco-Score Dashboard', desc: 'Track your personal carbon footprint offset rewards for public transit usage.', icon: Award, progress: 'Ready' },
    { title: 'Energy Saving Insights', desc: 'Intelligent HVAC operations scheduling, reducing arena baseline draw by 15%.', icon: Leaf, progress: 'Active' },
    { title: 'Smart Water Management', desc: 'Predictive rainwater capture systems and greywater recycling feedback.', icon: Recycle, progress: 'Active' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-[#1f293d] pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight">Sustainability Command</h1>
        <p className="text-gray-400 mt-1">AI-driven green initiatives for reducing environmental impact.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="p-6 rounded-xl border border-[#1f293d] bg-[#121826]/40 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-950 text-emerald-400 rounded-lg">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                  {metric.progress}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{metric.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{metric.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
