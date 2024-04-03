import { ITask } from '@interfaces'
import { Document, Schema, model } from 'mongoose'


const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    state: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<ITask & Document>('task', taskSchema)
