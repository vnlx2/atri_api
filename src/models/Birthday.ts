import {Schema, model} from 'mongoose';

// Schema
export const Birthdays = new Schema(
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

export const BirthdayModel = () => model('birthdays', Birthdays);
