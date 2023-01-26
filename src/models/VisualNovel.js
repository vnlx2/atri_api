import mongoose from "mongoose";

// Schema
const linkSchema = mongoose.Schema({
    provider : {
        type: String,
        required: true
    },
    type : {
        type: String
    },
    url : {
        type: String,
        required: true
    }
});

const downloadLinkSchema = mongoose.Schema({
    jp_link : [linkSchema],
    en_link : [linkSchema],
    id_link : [linkSchema]
});

const VisualNovel = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    alias: {
        type: String
    },
    length: {
        type: Number
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    download: downloadLinkSchema
}, {
    timestamps: true
});

export default mongoose.model('vndbs', VisualNovel);