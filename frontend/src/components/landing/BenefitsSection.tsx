import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Award, HelpCircle } from 'lucide-react';

type BenefitTab = 'fans' | 'organizers' | 'volunteers' | 'emergency';

export const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BenefitTab>('fans');

  const tabs: { id: BenefitTab; label: string; icon: any }[] = [
    { id: 'fans', label: 'For Fans', icon: Users },
    { id: 'organizers', label: 'For Organizers', icon: Shield },
    { id: 'volunteers', label: 'For Volunteers', icon: Award },
    { id: 'emergency', label: 'For Emergency Staff', icon: HelpCircle },
  ];

  const content = {
    fans: {
      headline: 'A Stress-Free Match-Day Experience',
      desc: 'No more guessing transit times or getting lost in massive corridors. Fans get access to a companion AI assisting them through their journey.',
      items: [
        'Transit planner routing directly to dynamic, less crowded gates.',
        'Wait-time predictors for food stands, restrooms, and concessions.',
        'Accessible pathways routing specifically configured for strollers or wheelchair assistance.',
        'Multilingual chat support to translate announcements instantly.',
      ],
      color: 'border-fifa-green-500/30 text-fifa-green-400',
    },
    organizers: {
      headline: 'Maximum Operational Oversight',
      desc: 'Monitor crowd movements and stadium infrastructure telemetry from a single centralized console.',
      items: [
        'Real-time crowd flow density heatmaps indicating potential bottlenecks.',
        'HVAC and lighting energy balancing reducing stadium utility consumption.',
        'Automated dispatch alerts coordinating volunteer tasks based on crowd spikes.',
        'Unified console integrating telemetry from gates, concession nodes, and ticket hubs.',
      ],
      color: 'border-fifa-gold-500/30 text-fifa-gold-400',
    },
    volunteers: {
      headline: 'Actionable In-Field Guidance',
      desc: 'Equip volunteers with local tasks and route maps to assist lost or disabled fans efficiently.',
      items: [
        'Dynamic task queue assigning tasks based on volunteer location.',
        'Step-by-step route guiding to dispatch points within the arena.',
        'Quick accessibility reporting templates for reporting broken facilities.',
        'Direct chat link with command center coordinators.',
      ],
      color: 'border-sky-500/30 text-sky-400',
    },
    emergency: {
      headline: 'Rapid Tactical Coordination',
      desc: 'Accelerate medical response times by routing squads through clear concourse paths.',
      items: [
        'Priority incident alerts detailing type, location, and severity index.',
        'Evacuation route calculations automatically directing traffic away from incident zones.',
        'Live location tracking of paramedics and first-responder volunteers.',
        'Dynamic gate locks integration enabling rapid exit-entry corridors.',
      ],
      color: 'border-rose-500/30 text-rose-400',
    },
  };

  return (
    <section id="solutions" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-fifa-green-400 bg-fifa-green-950/20 px-3 py-1.5 rounded-full border border-fifa-green-800/40">
            Operations Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why StadiumMind AI?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Discover the direct value added for every stakeholder attending or managing match day operations.
          </p>
        </div>

        {/* Tab Selector */}
        <div id="benefits" className="flex flex-wrap justify-center gap-3 border-b border-[#1f293d] pb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#121826] border border-[#1f293d] rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Icon className="w-4.5 h-4.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column Text details */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-2xl font-extrabold text-white">
                  {content[activeTab].headline}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {content[activeTab].desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content[activeTab].items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#121826]/30 border border-[#1f293d] rounded-xl text-xs text-gray-300 flex items-start space-x-2 leading-relaxed"
                    >
                      <span className="text-fifa-green-500 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Graphic visualization overlay */}
              <div className="lg:col-span-5 flex justify-center">
                <div className={`w-full max-w-[340px] h-[240px] rounded-2xl border ${content[activeTab].color} bg-[#121826]/20 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-fifa-green-500/10 to-transparent blur-xl" />
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-fifa-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Value Index Sandbox</span>
                  </div>
                  <div className="space-y-2">
                    <span className="block text-3xl font-extrabold text-white">
                      {activeTab === 'fans' ? '98.5%' : activeTab === 'organizers' ? '2.5x' : activeTab === 'volunteers' ? '60%' : '3.8m'}
                    </span>
                    <span className="block text-xs text-gray-400 leading-normal">
                      {activeTab === 'fans' && 'Reported satisfaction score for match flow assistance.'}
                      {activeTab === 'organizers' && 'Efficiency multiplier in resolving crowd bottlenecks.'}
                      {activeTab === 'volunteers' && 'Reduction in average task routing transit time.'}
                      {activeTab === 'emergency' && 'Average response dispatch time (reduced by 45%).'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
