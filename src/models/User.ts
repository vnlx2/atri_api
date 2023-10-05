import {Schema, model} from 'mongoose';

export interface IUser {
  username: string;
  password?: string;
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

export const UserModel = () => model('users', User);
