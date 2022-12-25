import VisualNovel from "../models/VisualNovel.js";
import { findByCode } from "./vndbService.js";

// Store Visual Novel
const store = async (body) => {
    try {
        const isVNExists = await VisualNovel.findOne({code: body.code});
        if(isVNExists) {
            throw { code: 400, message: 'VN Code exists' };
        }
        body = { ...body, ...convertFormFormatToDBFormat(body)};
        delete body['vnDataUrls'];
        const vn = await VisualNovel.create(body);
        await vn.save();
        return { code: 201 };
    } catch (err) {
        throw err;
    }
};

const detail = async (code) => {
    try {
        let response = await VisualNovel.findOne({code: code}).select();
        if(!response) {
            throw { code: 404, message: 'Not Found' };
        }
        const title = await findByCode(response.code, {title:1, _id: 0});
        response = {
            code: response.code,
            title: title.title,
            vnDataUrls: convertDBFormatToFormFormat(response)
        };
        return { code: 200, data: response };
    } catch (err) {
        throw err;
    }
}

const update = async(body) => {
    try {
        const isVNExists = await VisualNovel.findOne({code: body.code});
        if(!isVNExists) {
            throw { code: 404, message: 'VN Not Found' };
        }
        body = { ...body, ...convertFormFormatToDBFormat(body) };
        delete body['vnDataUrls'];
        await VisualNovel.updateOne({code: body.code}, {$set: body});
        return { code: 200 };
    } catch (err) {
        throw err;
    }
}

const drop = async(code) => {
    try {
        const isVNExists = await VisualNovel.findOne({code: code});
        if(!isVNExists) {
            throw { code: 404, message: 'VN Not Found' };
        }
        await VisualNovel.deleteOne({code: code});
    } catch (err) {
        throw err;
    }
}

const convertFormFormatToDBFormat = (body) => {
    try {
        let result = {
            jp_link: [],
            en_link: [],
            id_link: []
        };
        Object.values(body.vnDataUrls).forEach(urlData => {
            const language = urlData.language;
            delete urlData['language'];
            if(language == 'JP') {
                result.jp_link.push(urlData);
            }
            else if(language == 'EN') {
                result.en_link.push(urlData);
            }
            else {
                result.id_link.push(urlData);
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

const convertDBFormatToFormFormat = (query) => {
    try {
        let result = {};
        if(Object.keys(query.jp_link).length > 0) {
            Object.values(query.jp_link).forEach(urlData => {
                result[urlData._id] = createFormFormat(urlData, 'JP');
            });
        }
        if(Object.keys(query.en_link).length > 0) {
            Object.values(query.en_link).forEach(urlData => {
                result[urlData._id] = createFormFormat(urlData, 'EN');
            });
        }
        if(Object.keys(query.id_link).length > 0) {
            Object.values(query.id_link).forEach(urlData => {
                result[urlData._id] = createFormFormat(urlData, 'ID');
            });
        }
        return result;
    }  catch (err) {
        throw err;
    }
}

const createFormFormat = (urlData, language) => {
    return {
        language: language,
        provider: urlData.provider,
        type: urlData.type,
        url: urlData.url,
        _id: urlData._id
    }
}

export default {
    store, 
    detail,
    update,
    drop,
};