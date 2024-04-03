import { TaskController } from '@controllers'
import { Router } from 'express'

export class TaskRoute {
  public path = '/'
  public router = Router()
  public taskController = new TaskController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,this.taskController.taskRetrieveAll)
  }
}
