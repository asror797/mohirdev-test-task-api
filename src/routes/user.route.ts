import { UserController } from "@controllers"
import { Router } from "express"

export class UserRoute {
  public path = '/'
  public router = Router()
  public userController = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,this.userController.userRetrieveAll)
  }
}
