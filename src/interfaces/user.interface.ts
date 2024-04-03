import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId,
  fullname: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}
