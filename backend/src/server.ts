import app from './app';
import { config } from './config/env';

const server = app.listen(config.PORT, () => {
  console.log(`==================================================`);
  console.log(`StadiumMind AI - Command Center Backend is Running`);
  console.log(`Port:        ${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
  console.log(`Date/Time:   ${new Date().toISOString()}`);
  console.log(`==================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
