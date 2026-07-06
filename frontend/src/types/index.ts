export type ThemeMode = 'light' | 'dark';

export type UserRole = 'fan' | 'organizer' | 'volunteer' | 'emergency';

export interface AppState {
  theme: ThemeMode;
  role: UserRole;
  setTheme: (theme: ThemeMode) => void;
  setRole: (role: UserRole) => void;
}

export interface StadiumAlert {
  id: string;
  level: 'info' | 'warning' | 'danger';
  message: string;
  timestamp: string;
  location: string;
}

export interface AIServiceResponse {
  success: boolean;
  text: string;
  metadata?: Record<string, any>;
}

export interface IAIService {
  analyzeCrowdDensity(imageBuffer: ArrayBuffer | string): Promise<AIServiceResponse>;
  optimizeTrafficFlow(sensorData: Record<string, any>): Promise<AIServiceResponse>;
  respondToEmergency(alert: StadiumAlert): Promise<AIServiceResponse>;
  chatWithAssistant(message: string, context?: Record<string, any>): Promise<AIServiceResponse>;
}
