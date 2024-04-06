import { AuthController } from '@controllers'
import { Router } from 'express'

export class AuthRoute {
  public path = '/auth'
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sign-up`, this.authController.userSignUp)
    this.router.post(`${this.path}/sign-in`, this.authController.userSignIn)
    this.router.post(`${this.path}/refresh`, this.authController.userRefresh)
  }
}
