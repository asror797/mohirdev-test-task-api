import { IUser, UserRoleEnum } from '@interfaces'
import { Document, Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.User,
    },
  },
  {
    timestamps: true,
  },
)

export const userModel = model<IUser & Document>('user', userSchema)
