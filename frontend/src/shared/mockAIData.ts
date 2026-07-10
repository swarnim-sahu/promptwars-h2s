import type { AIResponse, DecisionHistory, AIMetric } from '../types';

export const mockAIResponse: AIResponse = {
  summary: "Heavy pedestrian build-up identified at Gate B (North Stand) due to ticket scanning delays. East Stand Gate A remains fully operational with zero queues.",
  riskLevel: "High",
  confidence: 94,
  reasoning: [
    "Average processing latency at Gate B has spiked to 45 seconds per fan.",
    "Arrival rate from regional shuttle trains has peaked at 4,200 fans/hour in Zone 2.",
    "Gate A is under-utilized at 25% throughput capacity."
  ],
  recommendedActions: [
    "Redirect incoming Zone 2 shuttle arrivals directly to Gate A using smart display signage.",
    "Deploy 4 volunteer stewards to Sector 103 walkway coordinates to guide fans.",
    "Send localized mobile push notification to Argentina ticket holders recommending East Concourse corridors."
  ],
  expectedImpact: "Reduces Gate B queue volume by 35% and maintains average entry transit under 6 minutes.",
  announcement: {
    english: "Attention fans: Gate B is currently congested. Please follow signs to Gate A for immediate entry.",
    spanish: "Atención aficionados: La Puerta B está congestionada. Por favor, sigan las indicaciones hacia la Puerta A para un ingreso inmediato.",
    french: "Attention aux supporters : la porte B est actuellement encombrée. Veuillez suivre les panneaux vers la porte A pour une entrée immédiate."
  }
};

export const mockDecisionHistory: DecisionHistory[] = [
  {
    id: "dec-101",
    timestamp: "2026-07-06T14:32:00Z",
    situationSummary: "Gate B (North Stand) queue delay of 18+ minutes.",
    aiRecommendation: "Redirect incoming shuttle arrivals to Gate A.",
    confidence: 95,
    reasoning: "Gate B turnstile latency at 45s. Gate A capacity at 25%.",
    accepted: true,
    executionStatus: "Executed",
    estimatedImpact: "Reroute 40% of Gate B arrival rate.",
    actualOutcome: "Wait time at Gate B reduced from 18 to 6 minutes.",
    organizerNotes: "Dynamic signs updated successfully. Stewards deployed."
  },
  {
    id: "dec-102",
    timestamp: "2026-07-06T15:12:00Z",
    situationSummary: "Concourse sound levels spiked to 108dB near Sector 104 sensory rooms.",
    aiRecommendation: "Deploy sensory kits and activate noise partitions.",
    confidence: 91,
    reasoning: "Noise limit exceeded for 12 minutes. Risk of sensory overload.",
    accepted: true,
    executionStatus: "Executed",
    estimatedImpact: "Reduce ambient decibels by 10-12%.",
    actualOutcome: "Sensory room entries stabilized. Sound levels normalized to 92dB.",
    organizerNotes: "Handed out 35 noise-cancelling headphones."
  }
];

export const mockMetrics: AIMetric[] = [
  {
    timestamp: "2026-07-06T14:32:01Z",
    executionTime: 320,
    responseSize: 1024,
    promptVersion: "opsRecommendationPrompt_v1",
    requestType: "Operational Recommendation",
    success: true
  },
  {
    timestamp: "2026-07-06T15:12:02Z",
    executionTime: 290,
    responseSize: 850,
    promptVersion: "opsRecommendationPrompt_v1",
    requestType: "Operational Recommendation",
    success: true
  }
];
