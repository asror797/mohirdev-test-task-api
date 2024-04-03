import { TaskService } from "@services";
import { NextFunction, Request, Response } from "express";

export class TaskController {
  private taskService = new TaskService()

  public taskRetrieveAll = async(req:Request,res:Response,next:NextFunction) => {
    try {
      res.json(await this.taskService.taskRetrieveAll({}))
    } catch (error) {
      next(error)
    }
  }

  public taskRetrieveOne = async(req:Request,res:Response,next:NextFunction) => {
    try {
      res.json(await this.taskService.taskRetrieveOne())
    } catch (error) {
      next(error)
    }
  }

}
