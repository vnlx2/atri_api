import VisualNovel from "../models/VisualNovel.js";

const list = async (page = 1) => {
    try
    {
        return await VisualNovel.find({ downloadUrl: { $exists: true } })
            .select('code title -_id').sort({'code' : 1}).limit(25).skip(25 * (page - 1))
            .collation({ locale: "en_US", numericOrdering: true });
    }
    catch (err)
    {
        throw err;
    }
}

const find = async (code) => {
    try
    {
        return await VisualNovel.findOne({ code: code, downloadUrl: { $exists: true } })
            .select('code title downloadUrl');
    }
    catch (err)
    {
        throw err;
    }
}

const update = async (code, data, mode = 'store') => {
    try
    {
        return await VisualNovel.updateOne({ code: code, downloadUrl: { $exists: !(mode === 'store') } },
            { downloadUrl: data }, { runValidators: true })
    }
    catch (err)
    {
        throw err;
    }
}

const drop = async (code) => {
    try
    {
        return await VisualNovel.updateOne({ code: code, downloadUrl: { $exists: true } },
            { $unset: { downloadUrl: 1 } });
    }
    catch (err)
    {
        throw err;
    }
}

export default {
    list, find, update, drop
}