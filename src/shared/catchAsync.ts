import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default catchAsync;
