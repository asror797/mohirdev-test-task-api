import { Types } from 'mongoose'

export enum TaskStateEnum {
  Created = 'created',
  Pending = 'pending',
  Completed = 'completed',
  Deleted = 'deleted',
}

export interface ITask {
  _id: Types.ObjectId
  user: Types.ObjectId
  title: string
  description: string
  state: TaskStateEnum
  createdAt: Date
  updatedAt: Date
}
