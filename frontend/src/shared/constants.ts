export const APP_NAME = 'StadiumMind AI';
export const APP_TAGLINE = 'The AI Command Center for FIFA World Cup 2026';

export const ROUTES = {
  LANDING: '/',
  FAN_DASHBOARD: '/fan-dashboard',
  OPS_DASHBOARD: '/ops-dashboard',
  ACCESSIBILITY: '/accessibility',
  SUSTAINABILITY: '/sustainability',
  SETTINGS: '/settings',
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const USER_ROLES = {
  FAN: 'fan',
  ORGANIZER: 'organizer',
  VOLUNTEER: 'volunteer',
  EMERGENCY: 'emergency',
} as const;
