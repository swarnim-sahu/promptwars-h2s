import { Request, Response, NextFunction } from 'express';
import { SystemStatusResponse } from '../types/dto';

export const getStatus = (
  req: Request, 
  res: Response<SystemStatusResponse>, 
  next: NextFunction
): void => {
  try {
    res.status(200).json({
      success: true,
      message: 'StadiumMind AI API is fully operational',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    });
  } catch (error) {
    next(error);
  }
};
