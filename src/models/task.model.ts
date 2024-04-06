import { ITask, TaskStateEnum } from '@interfaces'
import { Document, Schema, model } from 'mongoose'

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    state: {
      type: String,
      enum: Object.values(TaskStateEnum),
      default: TaskStateEnum.Created,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const taskModel = model<ITask & Document>('task', taskSchema)
