import { TaskService } from '@services'
import { NextFunction, Request, Response } from 'express'
import { ParsedQs } from 'qs'

export class TaskController {
  private taskService = new TaskService()

  public taskRetrieveAll = async (
    req: Request<ParsedQs>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const pageNumber = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.size as string) || 10
      const search = req.query.search as string | undefined

      res.json(
        await this.taskService.taskRetrieveAll({
          pageNumber,
          pageSize,
          search,
          userId: req.params.id as string,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public taskRetrieveOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.json(await this.taskService.taskRetrieveOne({ id: '' }))
    } catch (error) {
      next(error)
    }
  }

  public taskCreate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const payload = req.body
      res.json(await this.taskService.taskCreate(payload))
    } catch (error) {
      next(error)
    }
  }

  public taskUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const payload = req.body
      res.json(await this.taskService.taskUpdate(payload))
    } catch (error) {
      next(error)
    }
  }

  public taskDelete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const payload = req.body
      res.json(await this.taskService.taskDelete(payload))
    } catch (error) {
      next(error)
    }
  }
}
