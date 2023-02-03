import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "../utils/responseHelper.js";
import User from "../models/User.js";

dotenv.config();

export default function validation(roles) {
  return async (req, res, next) => {
    try {
      if (
        req.method == "OPTIONS" &&
        req.headers.origin &&
        req.headers["access-control-request-method"]
      ) {
        return next();
      }

      const bearerHeader = req.headers["authorization"];
      if (typeof bearerHeader === "undefined") {
				throw "Unauthorized";
      }
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];

      if (!token) {
        throw "unauthorized";
      }

      const decode = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(decode.user_id).select("role");
      if (!roles.length || !roles.includes(user.role)) {
				throw "Unauthorized";
			}
      return next();
    } catch (err) {
      return error(res, 403, "auth_required", "Unauthorized", err);
    }
  };
};
