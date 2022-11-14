import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error, success } from "../utils/responseHelper.js";

dotenv.config();

// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!(username && password)) {
            return error(res, 400, 'credential_validation_failed', 'Username or Password Empty');
        }
        const user = await User.findOne({username}).select('+password');

        if(!user) {
            return error(res, 400, 'credential_username_invalid', 'Username Not Exists');
        }
        else if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );

            user.token = token;

            return success(res, 200, 'Login Success', [{"token": token}]);
        }
        else {
            return error(res, 400, 'credential_password_invalid', 'Invalid Password');
        }
    } catch(err) {
        return error(res, 500, 'Login Failed', err);
    }
}