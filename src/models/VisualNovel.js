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

const VisualNovel = mongoose.Schema({
    code : {
        type: String,
        required: true
    },
    jp_link : [linkSchema],
    en_link : [linkSchema],
    id_link : [linkSchema],
}, {
    timestamps: true
});

export default mongoose.model('visual_novels', VisualNovel);