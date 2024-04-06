import { Request } from 'express'

export interface DataStoredToken {
  id: string
  org: string
  userId: string
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface RequestWithUser extends Request {
  data?: DataStoredToken
}