import {Schema, model} from 'mongoose';

export interface IUser {
  username: string;
  password?: string;
  role: string;
  timestamps?: string;
}

// Schema
const UserSchema = new Schema(
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

export const UserModel = () => model('users', UserSchema);
