import { NextFunction, Request, Response } from 'express';
import { HttpException, logger } from 'common';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const fieldErrors = error.fieldErrors;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message, fieldErrors });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
