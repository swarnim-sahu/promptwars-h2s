import app from './app';
import { config } from './config/env';

// Fail-fast Environment Validation for Production Readiness
if (config.NODE_ENV === 'production') {
  if (!config.GEMINI_API_KEY) {
    console.error("==================================================");
    console.error("FATAL ERROR: Required environment variable GEMINI_API_KEY is missing in production mode.");
    console.error("Terminating server startup.");
    console.error("==================================================");
    process.exit(1);
  }
}

console.log("Gemini Key:", config.GEMINI_API_KEY ? "FOUND" : "NOT FOUND");
console.log("Model:", config.GEMINI_MODEL);
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
