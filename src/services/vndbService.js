import VNDB from "vndb-api";
import VNDBCache from "../models/VNDBCache.js";

const vndb = new VNDB('atri_api');

export const findByCode = async (code, filter={}) => {
    try {
        const result = await VNDBCache.findOne({code: code}, filter);
        if(!result) {
            return await cache(code);
        }
        return result;
    } catch (err) {
        throw err;
    }
}

const cache = async (code) => {
    try {
        let result = await vndb.query(`get vn basic,details,stats (id = ${code.replace('v','')})`);
        if(!result) {
            throw { code: 404, message: 'Visual Novel Not Found' };
        }
        result = result.items[0];
        const body = {
            code: code,
            title: result.title,
            alias: result.alias,
            length: result.length,
            rating: result.rating,
            description: result.image,
            image: result.image
        };
        const response = await VNDBCache.create(body);
        response.save();
        return body;
    } catch (err) {
        console.error(err);
        throw err;
    }
}