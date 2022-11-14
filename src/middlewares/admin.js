import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "../utils/responseHelper.js";
import User from "../models/User.js";

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        return error(res, 403, 'auth_required', 'Unauthorized');
    }

    try {
        const decode = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decode.user_id).select('role');
        if(user.role == 'admin') {
            next();
        }
        else {
            throw 'Unauthorized';
        }
    } catch (err) {
        return error(res, 403, 'auth_required', 'Unauthorized', err);
    }
}

export default verifyToken;