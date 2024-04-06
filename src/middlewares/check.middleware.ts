import { NextFunction, Request, Response } from 'express'

export const checkPermission = (action: string) => {
  return async (
    req: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      next()
    } catch (error) {
      next(error)
    }
  }
}
