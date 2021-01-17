import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import ErrorLogger from '@shared/errors/ErrorLogger';

export default async function errorHandler(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Promise<Response | void> {
  const logger = new ErrorLogger();
  logger.saveError(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
