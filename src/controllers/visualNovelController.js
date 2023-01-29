import VisualNovelService from "../services/visualNovelService.js";
import { error, success } from "../utils/responseHelper.js";

// Show Visual Novel List
export const list = async (req, res) => {
    try {
        const visualNovels = await VisualNovelService.list(req.query.page);
        if(visualNovels.length === 0) {
            return error(res, 200, 'Empty Data');
        }
        return success(res, 200, 'Fetch Visual Novel List Success', visualNovels);
    } catch (err) {
        console.error(err);
        return error(res, 500, 'Fetch Visual Novel List Failed', err);
    }
}

// Show Visual Novel Detail
export const detail = async (req, res) => {
    try {
        const response = await VisualNovelService.detail(req.query.code);
        return success(res, 200, 'Fetch Visual Novel List Success', response.data);
    } catch (err) {
        console.error(err);
        if(err['code'] !== undefined) {
            return error(res, err.code, 'vn_not_found', err.message, err);
        }
        return error(res, 500, 'fetch_failed','Fetch Visual Novel Data Failed', err);
    }
}

// Check VNDB Code is valid or vn downloader is exists
export const getTitle = async (req, res) => {
    try {
        const response = await VisualNovelService.getTitle(req.query.code);
        return success(res, 200, 'Fetch Visual Novel Title Success', response);
    } catch (err)
    {
        console.error(err);
        if(err.name === 'VN_NOT_FOUND') {
            return error(res, 404, err.name, err.message, err);
        }
        else if(err.name === 'VN_REGISTERED') {
            return error(res, 400, err.name, err.message, err);
        }
        return error(res, 500, 'fetch_failed','Fetch Visual Novel Data Failed', err);
    }
}

// Store Visual Novel
export const store = async (req, res) => {
    try {
        await VisualNovelService.store(req.body, res);
        return success(res, 201, 'Store Visual Novel Data Success');
    } catch (err) {
        if(err['code'] !== undefined) {
            return error(res, err.code, 'vn_code_exists', err.message, err);
        }
        return error(res, 500, 'store_failed', 'Store Visual Novel Data Failed', err);
    }
};

// Update Visual Novel
export const update = async (req, res) => {
    try {
        await VisualNovelService.update(req.body, { runValidators: true });
        return success(res, 200, "Update Visual Novel Data Success");
    } catch (err) {
        console.error(err);
        return error(res, 500, 'update_failed','Update Visual Novel Data Failed', err);
    }
}

// Delete Visual Novel
export const drop = async (req, res) => {
    try {
        await VisualNovelService.drop(req.query.code);
        return success(res, 200, "Destroy Visual Novel Data Success");
    } catch (err) {
        return error(res, 500, 'drop_failed', 'Destroy Visual Novel Data Failed', err);
    }
}