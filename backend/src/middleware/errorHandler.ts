import { Request, Response, NextFunction } from 'express';
import { ApiErrorResponse } from '../types/dto';

export interface HttpError extends Error {
  statusCode?: number;
}

interface DevErrorResponse extends ApiErrorResponse {
  stack?: string;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response<DevErrorResponse>,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  console.error(`[Error] ${req.method} ${req.url} :`, err.stack || err.message || err);
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
