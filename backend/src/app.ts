import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mainRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API versioning endpoint mounting
app.use('/api', mainRouter);

// Fallback 404 Route for api
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url} - Endpoint not found`,
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
