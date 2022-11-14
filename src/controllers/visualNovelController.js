import VisualNovel from "../models/VisualNovel.js";
import { error, success } from "../utils/responseHelper.js";

// Show Visual Novel List
export const list = async (req, res) => {
    try {
        const vn = await VisualNovel.find().select('-jp_link -en_link -id_link');
        if(vn.length === 0) {
            return error(res, 200, 'Empty Data');
        }
        return success(res, 200, 'Fetch Visual Novel List Success', vn);
    } catch (err) {
        return error(res, 500, 'Fetch Visual Novel List Failed', err);
    }
}

// Show Visual Novel Detail
export const detail = async (req, res) => {
    try {
        const vn = await VisualNovel.findById(req.query.id).select();
        if(vn.length === 0) {
            return error(res, 200, 'Empty Data');
        }
        return success(res, 200, 'Fetch Visual Novel List Success', vn);
    } catch (err) {
        return error(res, 500, 'Fetch Visual Novel List Failed', err);
    }
}

// Store Visual Novel
export const store = async (req, res) => {
    try {
        const isVNExists = await VisualNovel.findOne({code: req.body.code});
        if(isVNExists) {
            return error(res, 400, 'VN Code exists');
        }
        else {
            const vn = await VisualNovel.create(req.body);
            await vn.save();
            return success(res, 201, "Store User Data Success");
        }
    } catch (err) {
        return error(res, 500, 'Store Visual Novel Data Failed', err);
    }
};

// Update Visual Novel
export const update = async (req, res) => {
    try {
        const vn = await VisualNovel.findById(req.body.id);
        if(vn === null) {
            return error(res, 404, "Data Not Found");
        }
        await VisualNovel.updateOne({_id: req.body.id}, {$set: req.body});
        return success(res, 200, "Update Birthday Data Success");
    } catch (err) {
        return error(res, 500, 'Update Visual Novel Data Failed', err);
    }
}

// Delete Visual Novel
export const drop = async (req, res) => {
    try {
        const vn = await VisualNovel.findById(req.query.id);
        if(vn === null) {
            return error(res, 404, "Data Not Found");
        }
        await VisualNovel.deleteOne({_id: req.query.id});
        return success(res, 200, "Destroy Visual Novel Data Success");
    } catch (err) {
        return error(res, 500, 'Destroy Visual Novel Data Failed', err);
    }
}