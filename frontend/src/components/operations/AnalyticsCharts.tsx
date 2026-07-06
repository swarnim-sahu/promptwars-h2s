import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockChartData } from '../../shared/mockData';
import { TrendingUp } from 'lucide-react';

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl border border-[#1f293d] bg-[#121826]/40 shadow-lg space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1f293d] pb-4 space-y-3 sm:space-y-0">
        <div>
          <h3 className="font-extrabold text-white text-lg tracking-tight">Crowd Flow & Exit Rate Analytics</h3>
          <p className="text-gray-500 text-xs mt-0.5">Real-time arrival rate compared against predictive egress simulations.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-fifa-green-400 bg-fifa-green-950/20 px-3 py-1 rounded border border-fifa-green-800/40">
          <TrendingUp className="w-4 h-4" />
          <span>Simulation Mode: Active</span>
        </div>
      </div>

      {/* Recharts Wrapper */}
      <div className="h-[280px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockChartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorArrival" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffd700" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffd700" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280" 
              fontSize={10} 
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0c1220', borderColor: '#1f293d', borderRadius: '8px' }}
              labelStyle={{ fontWeight: 'bold', color: '#fff' }}
              itemStyle={{ color: '#aaa' }}
            />
            <Legend 
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
            />
            <Area 
              name="Arrival Rate (Actual)" 
              type="monotone" 
              dataKey="arrivalRate" 
              stroke="#22c55e" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorArrival)" 
            />
            <Area 
              name="Exit Flow Forecast (AI)" 
              type="monotone" 
              dataKey="exitProjection" 
              stroke="#ffd700" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorExit)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
