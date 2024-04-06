import { UserService } from "@services";
import { NextFunction, Request, Response } from "express";


export class UserController {
  private userService = new UserService()

  public userRetrieveAll = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const pageNumber = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.size as string) || 10
      const search = req.query.search as string | null
      res.json(await this.userService.userRetrieveAll({
        pageSize,
        pageNumber,
        search
      }))
    } catch (error) {
      next(error)
    }
  }

  public userRetrieveOne = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const id = req.params.id as string
      res.json(await this.userService.userRetrieveOne({ id }))
    } catch (error) {
      next(error)
    }
  }

  public userCreate = async(req:Request,res:Response,next:NextFunction) => {
    try {
      res.json(await this.userService.userCreate({}))
    } catch (error) {
      next(error)
    }
  }

  public userUpdate = async(req: Request, res:Response, next:NextFunction) => {
    try {
      
    } catch (error) {
      next(error)
    }
  }

  public userDelete = async(req:Request, res:Response, next:NextFunction) => {
    try {
      res.json(await this.userService.userDelete({ id: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
