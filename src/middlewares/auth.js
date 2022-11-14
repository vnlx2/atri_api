import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "../utils/responseHelper.js";

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        return error(res, 403, 'auth_required', 'Unauthorized');
    }

    try {
        jwt.verify(token, process.env.TOKEN_KEY);
        return next();
    } catch (err) {
        return error(res, 403, 'auth_required', 'Unauthorized', err);
    }
}

export default verifyToken;