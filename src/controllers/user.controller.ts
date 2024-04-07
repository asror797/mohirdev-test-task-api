import { IdDto, UserUpdateDto } from '@dtos'
import { UserService } from '@services'
import { NextFunction, Request, Response } from 'express'
import { validation } from 'utils/validation.util'

export class UserController {
  private userService = new UserService()

  public userRetrieveAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const pageNumber = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.size as string) || 10
      const search = req.query.search as string | undefined
      res.json(
        await this.userService.userRetrieveAll({
          pageSize,
          pageNumber,
          search,
        }),
      )
    } catch (error) {
      next(error)
    }
  }

  public userRetrieveOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await validation(IdDto, { id: req.params.id })
      res.json(await this.userService.userRetrieveOne({ id: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  public userCreate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const payload = req.body
      res.json(await this.userService.userCreate(payload))
    } catch (error) {
      next(error)
    }
  }

  public userUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await validation(IdDto, { id: req.params.id })
      await validation(UserUpdateDto, { ...req.body, id: req.params.id }, {
        skipMissingProperties: true
      })

      res.json(await this.userService.userUpdate({...req.body, id: req.params.id}))
    } catch (error) {
      next(error)
    }
  }

  public userDelete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await validation(IdDto, { id: req.params.id })
      res.json(await this.userService.userDelete({ id: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
