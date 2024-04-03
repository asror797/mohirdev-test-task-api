import { UserService } from "@services";
import { NextFunction, Request, Response } from "express";


export class UserController {
  private userService = new UserService()

  public userRetrieveAll = async(req:Request, res:Response, next:NextFunction) => {
    try {
      res.json(await this.userService.userRetrieveAll())
    } catch (error) {
      next(error)
    }
  }

  public userRetrieveOne = async(req:Request, res:Response, next:NextFunction) => {
    try {
      res.json(await this.userService.userRetrieveOne())
    } catch (error) {
      next(error)
    }
  }
}

