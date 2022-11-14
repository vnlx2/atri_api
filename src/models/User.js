import mongoose from "mongoose";

// Schema
const User = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true,
        select: false
    },
    role : {
        type: String,
        required: true
    },
    token : {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('users', User);