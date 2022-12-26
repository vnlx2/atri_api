import Birthday from "../models/Birthday.js";
import moment from 'moment';
import { error, success } from "../utils/responseHelper.js";

// Initialized Moment
const now  = moment();

// Fetch All Birthday Data
export const all = async (req, res) => {
    try {
        const birthdays = await Birthday.find();
        success(res, 200, "Fetch Birthdays Data Success", birthdays);
    } catch (err) {
        error(res, 500, 'Fetch Birthdays Data Failed', err);
    }
}

// Fetch Todays Birthday
export const todayBirthday = async (req, res) => {
    // try {
    //     const birthdays = await Birthday.find({
    //         $and: [
    //             {
    //                 month: now.month() + 1
    //             },
    //             {
    //                 day: now.date() + 1
    //             }
    //         ]
    //     });
    //     res.json(birthdays);
    // } catch (err) {
    //     res.status(500).json({message: err.message});
    // }
}

// Fetch Birthday Data
export const show = async (req, res) => {
    try {
        const birthday = await Birthday.findById(req.query.id);
        if(birthday === null) {
            error(res, 404, 'not_found', 'Data Not Found');
        }
        else {
            success(res, 200, "Fetch Birthday Data Success", birthday);
        }
    } catch (err) {
        error(res, 500, 'Fetch Birthday Data Failed', err);
    }
}

// Insert Birthday Data
export const store = async (req, res) => {
    const birthday = await Birthday(req.body);
    try {
        await birthday.save();
        success(res, 201, "Store Birthday Data Success");
    } catch (err) {
        error(res, 500, 'Store Birthday Data Failed', err);
    }
}

// Update Birthday Data
export const update = async (req, res) => {
    const uid = await Birthday.findById(req.body._id);
    if (!uid) {
        error(res, 404, 'Data Not Found');
    }
    else {
        try {
            await Birthday.updateOne({_id: req.body._id}, {$set: req.body}, { runValidators: true });
            success(res, 200, "Update Birthday Data Success");
        } catch (err) {
            error(res, 500, 'Update Birthday Data Failed', err);
        }
    }
}

// Delete Birthday Data
export const drop = async (req, res) => {
    const uid = await Birthday.findById(req.query.id);
    if (!uid) {
        error(res, 404, 'Data Not Found');
    }
    else {
        try {
            await Birthday.deleteOne({_id: req.query.id});
            success(res, 200, "Delete Birthday Data Success");
        }  catch (err) {
            error(res, 500, 'Delete Birthday Data Failed', err);
        }
    }
}