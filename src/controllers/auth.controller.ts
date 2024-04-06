import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@services'

export class AuthController {
  private authService = new AuthService()

  public userSignUp = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const payload = req.body
      res.json(await this.authService.userSignUp(payload))
    } catch (error) {
      next(error)
    }
  }

  public userSignIn = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const payload = req.body
      res.json(await this.authService.userSignIn(payload))
    } catch (error) {
      next(error)
    }
  }

  public userRefresh = async(req:Request, res:Response, next:NextFunction) => {
    try {
      
    } catch (error) {
      next(error)
    }
  }
}
