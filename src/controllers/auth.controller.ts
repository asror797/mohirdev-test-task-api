import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@services'

export class AuthController {
  private authService = new AuthService()

  public userSignUp = async(req:Request, res:Response, next:NextFunction) => {
    try {
      res.json(await this.authService.userSignUp())
    } catch (error) {
      next(error)
    }
  }

  public userSignIn = async(req:Request, res:Response, next:NextFunction) => {
    try {
      res.json(await this.authService.userSignIn())
    } catch (error) {
      next(error)
    }
  }
}
