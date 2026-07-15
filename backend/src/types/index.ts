export interface StadiumAlert {
  id: string;
  level: 'info' | 'warning' | 'danger';
  message: string;
  timestamp: string;
  location: string;
}
