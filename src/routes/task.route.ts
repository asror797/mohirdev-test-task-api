import { TaskController } from '@controllers'
import { Router } from 'express'

export class TaskRoute {
  public path = '/task'
  public router = Router()
  public taskController = new TaskController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,this.taskController.taskRetrieveAll)
    this.router.get(`${this.path}/:id`,this.taskController.taskRetrieveOne)
    this.router.post(`${this.path}`,this.taskController.taskCreate)
    this.router.patch(`${this.path}/:id`,this.taskController.taskUpdate)
    this.router.delete(`${this.path}/:id`,this.taskController.taskDelete)
  }
}
