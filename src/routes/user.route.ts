import { UserController } from '@controllers'
import { Router } from 'express'

export class UserRoute {
  public path = '/user'
  public router = Router()
  public userController = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.userRetrieveAll)
    this.router.get(`${this.path}/:id`, this.userController.userRetrieveOne)
    this.router.post(`${this.path}`, this.userController.userCreate)
    this.router.patch(`${this.path}/:id`, this.userController.userUpdate)
    this.router.delete(`${this.path}/:id`, this.userController.userDelete)
  }
}
