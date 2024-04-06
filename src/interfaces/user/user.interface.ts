import { Types } from 'mongoose'

export enum UserRoleEnum {
  User = 'user',
  Admin = 'admin',
}

export interface IUser {
  _id: Types.ObjectId
  fullname: string
  email: string
  role: UserRoleEnum
  password: string
  createdAt: Date
  updatedAt: Date
}
