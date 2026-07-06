import React from 'react';
import { MatchStatusCard } from '../components/operations/MatchStatusCard';
import { KPIsGrid } from '../components/operations/KPIsGrid';
import { StadiumHeatmap } from '../components/operations/StadiumHeatmap';
import { AIDecisionCard } from '../components/operations/AIDecisionCard';
import { SystemHealthPanel } from '../components/operations/SystemHealthPanel';
import { LiveEventFeed } from '../components/operations/LiveEventFeed';
import { AnalyticsCharts } from '../components/operations/AnalyticsCharts';

export const OperationsDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="border-b border-[#1f293d] pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Operations Command Center</h1>
        <p className="text-gray-400 mt-1">Real-time telemetry, crowd flow analysis, AI advisory response, and staff dispatch.</p>
      </div>

      {/* Match banner and live ticking clock */}
      <MatchStatusCard />

      {/* Numerical count-up KPI gauges */}
      <KPIsGrid />

      {/* Center Layout: Heatmap Seating Map & AI Decision advisory checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StadiumHeatmap />
        <AIDecisionCard />
      </div>

      {/* Bottom Layout: Recharts Crowd flow analytics graph, Live match events feed, hardware lines status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LiveEventFeed />
        </div>
        <div className="lg:col-span-1">
          <SystemHealthPanel />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <AnalyticsCharts />
        </div>
      </div>
    </div>
  );
};

