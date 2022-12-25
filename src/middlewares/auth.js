import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error, success } from "../utils/responseHelper.js";

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        if(req.method == "OPTIONS") {
            return next();
        }

        const bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            
            if(!token) {
                throw "unauthorized";
            }
            
            jwt.verify(token, process.env.TOKEN_KEY);
            return next();
        }
        else {
            throw "Unauthorized";
        }
    } catch (err) {
        return error(res, 401, 'auth_required', 'Unauthorized', err);
    }
}
    

export default verifyToken;