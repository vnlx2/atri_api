import {Document, Schema, model} from 'mongoose';

export interface IUser {
  _id?: string;
  id?: string;
  username: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  role: string;
  timestamps?: string;
}

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = () => model<IUser & Document>('users', User);
