import {Document, Schema, model} from 'mongoose';
import {IVisualNovel} from '../interfaces/visualNovel';

// Schema
const linkSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  platform: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

const downloadLinkSchema = new Schema({
  jp_link: [linkSchema],
  en_link: [linkSchema],
  id_link: [linkSchema],
});

export const VisualNovel = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
    length: {
      type: Number,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    downloadUrl: downloadLinkSchema,
  },
  {
    timestamps: true,
  }
);

export const VisualNovelModel = model<IVisualNovel & Document>(
  'vndbs',
  VisualNovel
);
