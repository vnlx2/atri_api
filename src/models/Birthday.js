import mongoose from "mongoose";

// Schema
const Birthdays = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    month:{
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

export default mongoose.model('birthdays', Birthdays);