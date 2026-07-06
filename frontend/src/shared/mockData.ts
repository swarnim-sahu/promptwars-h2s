
export interface MockSector {
  id: string;
  name: string;
  capacity: number;
  occupancy: number;
  status: 'optimal' | 'moderate' | 'congested';
  volunteerCount: number;
}

export interface MockAlert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  message: string;
  location: string;
  time: string;
}

export interface MockLiveEvent {
  id: string;
  type: 'goal' | 'surge' | 'congestion' | 'medical' | 'announcement';
  message: string;
  timestamp: string;
  location: string;
}

export interface MockSystemHealth {
  name: string;
  status: 'optimal' | 'warning' | 'critical';
  latency: string;
}

export interface MockAIDecision {
  id: string;
  title: string;
  confidence: number;
  reasoning: string;
  actions: string[];
  impact: string;
}

export interface ChartTrendData {
  time: string;
  arrivalRate: number;
  exitProjection: number;
  capacityLimit: number;
}

// 1. Stadium Sections
export const mockSectors: MockSector[] = [
  { id: 'sec-101', name: 'Sector 101 (East Lower)', capacity: 4200, occupancy: 1890, status: 'optimal', volunteerCount: 4 },
  { id: 'sec-102', name: 'Sector 102 (East Upper)', capacity: 4800, occupancy: 4400, status: 'congested', volunteerCount: 8 },
  { id: 'sec-103', name: 'Sector 103 (North Lower)', capacity: 5500, occupancy: 4200, status: 'moderate', volunteerCount: 6 },
  { id: 'sec-104', name: 'Sector 104 (North Upper)', capacity: 6200, occupancy: 5900, status: 'congested', volunteerCount: 9 },
  { id: 'sec-105', name: 'Sector 105 (West Lower)', capacity: 4100, occupancy: 1200, status: 'optimal', volunteerCount: 3 },
  { id: 'sec-106', name: 'Sector 106 (West Upper)', capacity: 4600, occupancy: 2100, status: 'optimal', volunteerCount: 4 },
  { id: 'sec-107', name: 'Sector 107 (South Lower)', capacity: 5200, occupancy: 3900, status: 'moderate', volunteerCount: 5 },
  { id: 'sec-108', name: 'Sector 108 (South Upper)', capacity: 5900, occupancy: 5700, status: 'congested', volunteerCount: 11 },
];

// 2. Active Operational Alerts
export const mockAlerts: MockAlert[] = [
  { id: 'alert-1', level: 'critical', message: 'Gate B turnstile failure. Average flow speed down 35%.', location: 'Gate B (North)', time: '16:51' },
  { id: 'alert-2', level: 'warning', message: 'Elevator 4 out of service. Rerouting disabled fans to Elevator 3.', location: 'Concourse West', time: '16:47' },
  { id: 'alert-3', level: 'info', message: 'Sensory Room 2 has reached maximum occupancy.', location: 'Sector 104 Lounge', time: '16:42' },
  { id: 'alert-4', level: 'warning', message: 'Crowd surge spike detected at Concourse A concessions.', location: 'Sector 102 Concourse', time: '16:38' },
];

// 3. Live Match Day Tickers
export const mockLiveEvents: MockLiveEvent[] = [
  { id: 'ev-1', type: 'goal', message: 'GOAL! Argentina scores! (Messi - 64\')', timestamp: '16:51', location: 'Pitch Area' },
  { id: 'ev-2', type: 'surge', message: 'Crowd surge spike detected at North Concourse stairs.', timestamp: '16:52', location: 'Sector 103 Entryway' },
  { id: 'ev-3', type: 'congestion', message: 'Gate B queue wait time exceeds 15 minutes. Dispatching volunteer stewards.', timestamp: '16:53', location: 'Gate B' },
  { id: 'ev-4', type: 'medical', message: 'Medical assistance dispatched for minor incident.', timestamp: '16:54', location: 'Sector 108 Row K' },
  { id: 'ev-5', type: 'announcement', message: 'Public Announcement: "Fans in North Stand please use East exit paths."', timestamp: '16:55', location: 'Stadium PA System' },
];

// 4. System Health parameters
export const mockSystemHealth: MockSystemHealth[] = [
  { name: 'AI Decision Engine', status: 'optimal', latency: '42ms' },
  { name: 'Camera Network (4K Stream)', status: 'optimal', latency: '12ms' },
  { name: 'Sensor Telemetry (IOT)', status: 'warning', latency: '145ms (jitter)' },
  { name: 'Emergency Dispatch Net', status: 'optimal', latency: '8ms' },
  { name: 'Translation Services', status: 'optimal', latency: '65ms' },
];

// 5. AI Decision Engine Roster
export const mockAIDecisions: MockAIDecision[] = [
  {
    id: 'dec-1',
    title: 'North Gate Traffic Redirection',
    confidence: 98.5,
    reasoning: 'Turnstile bottleneck at Gate B (North) is generating wait times of 18+ minutes, posing crowd-pressure safety risks. Neighboring Gate A (East) remains underutilized (30% capacity, wait time <3 minutes).',
    actions: [
      'Trigger dynamic signage redirects on Concourse 2 path towards Gate A.',
      'Deploy 4 volunteer stewards to Sector 103 intersection to guide foot traffic.',
      'Send localized app notification to fans in Sectors 103-104 recommending East exits.'
    ],
    impact: 'Reduces Gate B queue pressure by 40% and balances exit times within 5 minutes.'
  },
  {
    id: 'dec-2',
    title: 'Sensory Load Shedding - Sectors 104-106',
    confidence: 92.1,
    reasoning: 'Decibel limits have continuously exceeded 105dB for 12 minutes in the North Stand concourses, impacting sensory care units.',
    actions: [
      'Activate localized dampening partitions in Concourse Level 2.',
      'Notify volunteers at sensory aid desks to hand out ear protections.',
      'Update active stadium map displaying calmer rest zones.'
    ],
    impact: 'Lowers local sound spikes by 12% and protects sensory-sensitive fans.'
  }
];

// 6. Chart Trend Analytics Data
export const mockChartData: ChartTrendData[] = [
  { time: '14:00', arrivalRate: 8000, exitProjection: 50, capacityLimit: 72000 },
  { time: '14:30', arrivalRate: 18000, exitProjection: 50, capacityLimit: 72000 },
  { time: '15:00', arrivalRate: 35000, exitProjection: 50, capacityLimit: 72000 },
  { time: '15:30', arrivalRate: 58000, exitProjection: 100, capacityLimit: 72000 },
  { time: '16:00', arrivalRate: 67000, exitProjection: 150, capacityLimit: 72000 },
  { time: '16:30', arrivalRate: 68450, exitProjection: 300, capacityLimit: 72000 },
  { time: '17:00', arrivalRate: 69000, exitProjection: 25000, capacityLimit: 72000 },
  { time: '17:30', arrivalRate: 69200, exitProjection: 62000, capacityLimit: 72000 },
];
