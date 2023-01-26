import VNDBCache from "../models/VNDBCache.js";

const find = async (code, filter='-__v -createdAt -updatedAt') => {
    try 
    {
        return await VNDBCache.findOne({code: code}).select(`${filter} -_id`);
    }
    catch (err)
    {
        throw err;
    }
}

export default {
    find
}