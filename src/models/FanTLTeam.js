import mongoose from "mongoose";

// Schema
const WorkSchema = mongoose.Schema({
    vndb_code : {
        type: String,
        required: true
    },
    release_code : {
        type: String,
    },
});

const FanTLTeam = mongoose.Schema({
    code : {
        type: String,
    },
    name : {
        type: String,
        required: true,
    },
    webpage : {
        type: String,
        required: true
    },
    works : [WorkSchema]
}, {
    timestamps: true
});

export default mongoose.model('fantl_teams', FanTLTeam);