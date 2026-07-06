import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockLiveEvents, type MockLiveEvent } from '../../shared/mockData';
import { ShieldCheck, MessageSquare, AlertTriangle, TrendingUp, BellRing } from 'lucide-react';

export const LiveEventFeed: React.FC = () => {
  const [events, setEvents] = useState<MockLiveEvent[]>([mockLiveEvents[0]]);
  const [nextIdx, setNextIdx] = useState(1);

  useEffect(() => {
    // Append a new simulated event every 8 seconds, cycling through the mock list
    const interval = setInterval(() => {
      const newEvent = {
        ...mockLiveEvents[nextIdx],
        id: `live-ev-${Date.now()}`, // unique ID
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      
      setEvents((prev) => [newEvent, ...prev.slice(0, 4)]); // Keep last 5 events
      setNextIdx((prev) => (prev + 1) % mockLiveEvents.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [nextIdx]);

  const getEventIcon = (type: MockLiveEvent['type']) => {
    switch (type) {
      case 'goal': return <TrendingUp className="w-4 h-4 text-emerald-400 animate-bounce" />;
      case 'surge': return <AlertTriangle className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'congestion': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'medical': return <ShieldCheck className="w-4 h-4 text-rose-400" />;
      case 'announcement': return <MessageSquare className="w-4 h-4 text-sky-400" />;
      default: return <BellRing className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEventBorder = (type: MockLiveEvent['type']) => {
    switch (type) {
      case 'goal': return 'border-l-4 border-emerald-500';
      case 'surge': return 'border-l-4 border-yellow-500';
      case 'congestion': return 'border-l-4 border-red-500';
      case 'medical': return 'border-l-4 border-rose-500';
      case 'announcement': return 'border-l-4 border-sky-500';
      default: return 'border-l-4 border-gray-500';
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/40 shadow-lg space-y-4 flex flex-col justify-between h-full min-h-[300px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f293d] pb-4">
        <div className="flex items-center space-x-2">
          <BellRing className="w-5 h-5 text-fifa-gold-400 animate-swing" />
          <h3 className="font-extrabold text-white text-lg tracking-tight">Live Matchday Feed</h3>
        </div>
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 animate-pulse">
          AUTO-REFRESH ACTIVE
        </span>
      </div>

      {/* Events List View */}
      <div className="flex-1 overflow-hidden min-h-[160px] relative">
        <div className="absolute inset-0 flex flex-col justify-start space-y-2">
          <AnimatePresence initial={false}>
            {events.map((ev) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`p-3 bg-black/10 rounded-xl border border-[#1f293d]/30 text-xs flex justify-between items-start gap-4 ${getEventBorder(ev.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-black/20 rounded-lg flex-shrink-0 mt-0.5">
                    {getEventIcon(ev.type)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{ev.location}</span>
                    <p className="text-gray-300 font-medium leading-relaxed text-[11px]">{ev.message}</p>
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 font-mono font-semibold flex-shrink-0 mt-0.5">{ev.timestamp}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-2 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest border-t border-[#1f293d]/50">
        Monitoring MetLife Feeds
      </div>

    </div>
  );
};
