import { error, success } from '../utils/responseHelper.js';
import userService from '../services/userService.js';

// Show All Users
export const all = async (req, res) => {
    try {
        const users = await userService.all();
        success(res, users.code, "Fetch Users Data Success", users.data);
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, err.name, err.message, err);
        }
        error(res, 500, 'FETCH_FAILED', 'Fetch Users Data Failed', err);
    }
}

// Fetch User Data
export const show = async (req, res) => {
    try {
        const user = await userService.detail(req.query.id);
        return success(res, user.code, "Fetch User Data Success", user.data);
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, err.name, err.message, err);
        }
        error(res, 500, 'FETCH_FAILED', 'Fetch User Data Failed', err);
    }
}

// Check username exists
export const checkUsernameExists = async (req, res) => {
    try {
        const isUsernameExists = await userService.checkUsernameExists(req.body.username);
        return success(res, 200, "Check username exists success", isUsernameExists);
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, err.name, err.message, err);
        }
        error(res, 500, 'FETCH_FAILED', 'Fetch User Data Failed', err);
    }
}

// Store User
export const store = async (req, res) => {
    try {
        await userService.store(req.body);
        return success(res, 201, "Store User Data Success");
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, err.name, err.message, err);
        }
        error(res, 500, 'STORE_FAILED', 'Store Users Data Failed', err);
    }
}

// Update User
export const update = async (req, res) => {
    try {
        await userService.update(req.body);
        return success(res, 200, "Update User Data Success");
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, err.name, err.message, err);
        }
        error(res, 500, 'UPDATE_FAILED', 'Update Users Data Failed', err);
    }
}

// Delete User
export const drop = async (req, res) => {
    try {
        await userService.drop(req.body.id);
        success(res, 200, "Delete Users Data Success");
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, err.name, err.message, err);
        }
        error(res, 500, 'DELETE_FAILED', 'Delete Users Data Failed', err);
    }
}
