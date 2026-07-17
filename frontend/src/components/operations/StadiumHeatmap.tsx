import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockSectors, type MockSector } from '../../shared/mockData';

const getStatusColor = (status: MockSector['status']) => {
  switch (status) {
    case 'optimal': return 'fill-emerald-600 stroke-emerald-500';
    case 'moderate': return 'fill-yellow-600 stroke-yellow-500';
    case 'congested': return 'fill-red-600 stroke-red-500';
    default: return 'fill-gray-600 stroke-gray-500';
  }
};

const getStatusBg = (status: MockSector['status']) => {
  switch (status) {
    case 'optimal': return 'bg-emerald-950/20 border-emerald-800 text-emerald-400';
    case 'moderate': return 'bg-yellow-950/20 border-yellow-800 text-yellow-400';
    case 'congested': return 'bg-red-950/20 border-red-800 text-red-400';
    default: return 'bg-gray-950/20 border-gray-800 text-gray-400';
  }
};

export const StadiumHeatmap: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<MockSector | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, sector: MockSector) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedSector(sector);
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/40 shadow-lg space-y-6 flex flex-col justify-between h-full min-h-[500px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f293d] pb-4">
        <div>
          <h3 className="font-extrabold text-white text-lg tracking-tight">Interactive Seating Heatmap</h3>
          <p className="text-gray-500 text-xs mt-0.5">Click any sector to inspect real-time crowd dynamics.</p>
        </div>
        <div className="flex space-x-3 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          <span className="flex items-center"><span className="w-2 h-2 rounded bg-emerald-500 mr-1.5" aria-hidden="true" />Optimal</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded bg-yellow-500 mr-1.5" aria-hidden="true" />Moderate</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded bg-red-500 mr-1.5" aria-hidden="true" />Congested</span>
        </div>
      </div>

      {/* Seating Map SVG Grid */}
      <div className="flex-1 flex items-center justify-center p-4 relative min-h-[250px]">
        
        {/* Actual Seating Layout representation */}
        <svg width="340" height="240" viewBox="0 0 340 240" className="filter drop-shadow-[0_0_12px_rgba(217,160,13,0.08)]">
          {/* Pitch center */}
          <rect x="120" y="90" width="100" height="60" rx="3" stroke="#15803d" strokeWidth="1" fill="#042a14" />
          <ellipse cx="170" cy="120" rx="20" ry="20" stroke="#15803d" strokeWidth="1" />
          <line x1="170" y1="90" x2="170" y2="150" stroke="#15803d" strokeWidth="1" />

          {/* East Stand Lower (Sector 101) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[0].name}. Status: ${mockSectors[0].status}.`}
            onClick={() => setSelectedSector(mockSectors[0])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[0])}
            d="M 170 20 A 130 90 0 0 1 270 70 L 240 85 A 95 60 0 0 0 170 50 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[0].status)} ${selectedSector?.id === mockSectors[0].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* East Stand Upper (Sector 102) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[1].name}. Status: ${mockSectors[1].status}.`}
            onClick={() => setSelectedSector(mockSectors[1])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[1])}
            d="M 270 70 A 130 90 0 0 1 295 120 L 260 120 A 95 60 0 0 0 240 85 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[1].status)} ${selectedSector?.id === mockSectors[1].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* North Stand Lower (Sector 103) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[2].name}. Status: ${mockSectors[2].status}.`}
            onClick={() => setSelectedSector(mockSectors[2])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[2])}
            d="M 295 120 A 130 90 0 0 1 270 170 L 240 155 A 95 60 0 0 0 260 120 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[2].status)} ${selectedSector?.id === mockSectors[2].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* North Stand Upper (Sector 104) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[3].name}. Status: ${mockSectors[3].status}.`}
            onClick={() => setSelectedSector(mockSectors[3])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[3])}
            d="M 270 170 A 130 90 0 0 1 170 220 L 170 190 A 95 60 0 0 0 240 155 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[3].status)} ${selectedSector?.id === mockSectors[3].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* West Stand Lower (Sector 105) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[4].name}. Status: ${mockSectors[4].status}.`}
            onClick={() => setSelectedSector(mockSectors[4])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[4])}
            d="M 170 20 A 130 90 0 0 0 70 70 L 100 85 A 95 60 0 0 1 170 50 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[4].status)} ${selectedSector?.id === mockSectors[4].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* West Stand Upper (Sector 106) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[5].name}. Status: ${mockSectors[5].status}.`}
            onClick={() => setSelectedSector(mockSectors[5])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[5])}
            d="M 70 70 A 130 90 0 0 0 45 120 L 80 120 A 95 60 0 0 1 100 85 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[5].status)} ${selectedSector?.id === mockSectors[5].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* South Stand Lower (Sector 107) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[6].name}. Status: ${mockSectors[6].status}.`}
            onClick={() => setSelectedSector(mockSectors[6])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[6])}
            d="M 45 120 A 130 90 0 0 0 70 170 L 100 155 A 95 60 0 0 1 80 120 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[6].status)} ${selectedSector?.id === mockSectors[6].id ? 'stroke-white stroke-[3px]' : ''}`}
          />

          {/* South Stand Upper (Sector 108) */}
          <path 
            role="button"
            tabIndex={0}
            aria-label={`${mockSectors[7].name}. Status: ${mockSectors[7].status}.`}
            onClick={() => setSelectedSector(mockSectors[7])}
            onKeyDown={(e) => handleKeyDown(e, mockSectors[7])}
            d="M 70 170 A 130 90 0 0 0 170 220 L 170 190 A 95 60 0 0 1 100 155 Z" 
            className={`cursor-pointer hover:opacity-90 stroke-2 transition-all focus:outline-none focus:stroke-white focus:stroke-[3px] ${getStatusColor(mockSectors[7].status)} ${selectedSector?.id === mockSectors[7].id ? 'stroke-white stroke-[3px]' : ''}`}
          />
        </svg>

        {/* Selected Sector Popover */}
        <AnimatePresence>
          {selectedSector && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bg-[#0c1220] border border-[#1f293d] p-4 rounded-xl shadow-2xl z-20 w-[240px] text-xs space-y-3"
            >
              <div className="flex justify-between items-center border-b border-[#1f293d] pb-2">
                <span className="font-bold text-white text-sm">{selectedSector.name}</span>
                <button 
                  onClick={() => setSelectedSector(null)} 
                  aria-label="Close sector details popover"
                  className="text-gray-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-fifa-gold-500 rounded px-1"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1.5 text-gray-400">
                <div className="flex justify-between">
                  <span>Simulated Flow</span>
                  <span className={`font-semibold capitalize px-1.5 py-0.5 rounded text-[10px] border ${getStatusBg(selectedSector.status)}`}>
                    {selectedSector.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Occupancy</span>
                  <span className="text-white font-medium">{selectedSector.occupancy.toLocaleString()} / {selectedSector.capacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity Rate</span>
                  <span className="text-white font-medium">{Math.round((selectedSector.occupancy / selectedSector.capacity) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Stewards</span>
                  <span className="text-white font-medium">{selectedSector.volunteerCount} On-site</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick overview metrics */}
      <div className="grid grid-cols-3 gap-4 border-t border-[#1f293d] pt-4 text-center">
        <div>
          <span className="block text-[10px] text-gray-500 font-bold uppercase">Optimal Gates</span>
          <span className="block font-bold text-sm text-emerald-400 mt-0.5">Gate A, C</span>
        </div>
        <div>
          <span className="block text-[10px] text-gray-500 font-bold uppercase">Congested Areas</span>
          <span className="block font-bold text-sm text-red-400 mt-0.5">Sectors 102, 108</span>
        </div>
        <div>
          <span className="block text-[10px] text-gray-500 font-bold uppercase">Active Staff</span>
          <span className="block font-bold text-sm text-white mt-0.5">54 Stewards</span>
        </div>
      </div>

    </div>
  );
};
