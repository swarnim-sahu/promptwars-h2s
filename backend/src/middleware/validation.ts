import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { ApiErrorResponse } from '../types/dto';

export const validateBody = (schema: ZodSchema, customMessage?: string) => {
  return (req: Request, res: Response<ApiErrorResponse>, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorList = error.issues.map((issue: ZodIssue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }));

        res.status(400).json({
          success: false,
          message: customMessage || "Validation failed",
          errors: errorList
        });
        return;
      }
      next(error);
    }
  };
};
