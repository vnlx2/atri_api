import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { error, success } from '../utils/responseHelper.js';

// Show All Users
export const all = async (req, res) => {
    try {
        const users = await User.find();
        if(users.length > 0) {
            success(res, 200, "Fetch Users Data Success", users);
        }
        else {
            success(res, 200, "Empty User Data");
        }
    } catch (err) {
        error(res, 500, 'Fetch Users Data Failed', err);
    }
}

// Fetch User Data
export const show = async (req, res) => {
    try {
        const user = await User.findOne({username: req.query.username}).select('-__v');
        if(user === null) {
            return error(res, 404, "Fetch User Data Failed");
        }
        return success(res, 200, "Fetch User Data Success", user);
    } catch (err) {
        error(res, 500, 'Fetch User Data Failed', err);
    }
}

// Store User
export const store = async (req, res) => {
    try {
        const isUsernameExists = await User.findOne({username: req.body.username});
        if(isUsernameExists) {
            return error(res, 400, 'Username exists');
        }
        else {
            bcrypt.hash(req.body.password, 10)
                    .then(async (hash) => {
                        req.body.password = hash;
                        const user = await User(req.body);
                        try {
                            await user.save();
                            return success(res, 201, "Store User Data Success");
                        } catch (err) {
                            throw err;
                        }
                    });
        }
    } catch (err) {
        error(res, 500, 'Store Users Data Failed', err);
    }
}

// Update User
export const update = async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        if(user === null) {
            return error(res, 404, "Data Not Found");
        }
        if("password" in req.body) {
            bcrypt.hash(req.body.password, 10)
                    .then(async (hash) => {
                        req.body.password = hash;
                        try {
                            await User.updateOne({_id: req.body.id}, {$set: req.body}, { runValidators: true });
                            return success(res, 200, "Update User Data Success");
                        } catch (err) {
                            throw err;
                        }
                    });
        }
        else if("username" in req.body) {
            const isUsernameExists = await User.findOne({username: req.body.username});
            if(isUsernameExists) {
                return error(res, 400, 'Username exists');
            }
        }
        await User.updateOne({_id: req.body.id}, {$set: req.body});
        return success(res, 200, "Update User Data Success");
    } catch (err) {
        error(res, 500, 'Update Users Data Failed', err);
    }
}

// Delete User
export const drop = async (req, res) => {
    try {
        const user = await User.findById(req.query.id);
        if(user === null) {
            return error(res, 404, "Data Not Found");
        }
        await User.deleteOne({_id: req.query.id});
        success(res, 200, "Delete Users Data Success");
    } catch (err) {
        error(res, 500, 'Delete Users Data Failed', err);
    }
}
