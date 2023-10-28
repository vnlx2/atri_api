import {Document, Schema, model} from 'mongoose';
import {IBirthday} from '../interfaces/birthday';

const Birthdays = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const BirthdayModel = () =>
  model<IBirthday & Document>('birthdays', Birthdays);
