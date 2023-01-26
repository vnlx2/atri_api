import VisualNovel from "../models/VisualNovel.js";

const list = async (code) => {
    try
    {
        return await VisualNovel.find().select('-jp_link -en_link -id_link')
            .sort({'code' : 1}).collation({ locale: "en_US", numericOrdering: true });
    }
    catch (err)
    {
        throw err;
    }
}

const find = async (code) => {
    try
    {
        
    }
    catch (err)
    {
        throw err;
    }
}

export default {
    list
}