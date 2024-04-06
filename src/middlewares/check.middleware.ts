import { NextFunction, Request, Response } from 'express'

export const checkPermission = (action: string) => {
  return async (
    req: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(action)
      next()
    } catch (error) {
      next(error)
    }
  }
}
