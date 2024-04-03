import { IUser } from '@interfaces'
import { Document, Schema, model } from 'mongoose'

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.User
    }
  },
  {
    timestamps: true
  }
)

export const userModel = model<IUser & Document>('user', userSchema)

