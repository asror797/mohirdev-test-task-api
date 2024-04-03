import { Types } from "mongoose";

export interface ITask {
  _id: Types.ObjectId
  user: Types.ObjectId
  title: string
  description: string
  state: string
  createdAt: Date
  updatedAt: Date
}
