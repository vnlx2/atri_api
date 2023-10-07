import {config} from 'dotenv';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {errorResponse, successResponse} from '../utils/responseHelper';
import AuthenticationService from '../services/authenticationService';

config();

export default class Authentication {
  /**
   * Login Controller
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          'VALIDATION_ERROR',
          'Input Validation Error',
          errors.array()
        );
      }

      const token = await AuthenticationService.Login(
        req.body.username,
        req.body.password
      );

      return successResponse(res, 200, 'Login Success', {
        accessToken: token,
      });
    } catch (error) {
      let errorCode, message;

      if (error instanceof Error) {
        switch (error.message) {
          case 'USER_NOT_FOUND':
            errorCode = 'USER_NOT_FOUND';
            message = 'User Not Found';
            break;
          case 'INVALID_PASSWORD':
            errorCode = 'INVALID_PASSWORD';
            message = 'Invalid Password';
            break;
          default:
            errorCode = 'INTERNAL_SERVER_ERROR';
            message = 'Internal Server Error';
            break;
        }
      }
      return errorResponse(
        res,
        error instanceof Error ? 400 : 500,
        errorCode!,
        message!,
        error
      );
    }
  }

  /**
   * Logout
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async logout(req: Request, res: Response) {
    try {
      await AuthenticationService.Logout(
        req.headers.authorization!.split(' ')[1]
      );
      return successResponse(res, 200, 'Logout Success');
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 400 : 500,
        'INTERNAL_SERVER_ERROR',
        'Internal Server Error',
        error
      );
    }
  }
}

// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { error, success } from "../utils/responseHelper.js";

// dotenv.config();

// // Login
// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         if(!(username && password)) {
//             return error(res, 400, 'credential_validation_failed', 'Username or Password Empty');
//         }
//         const user = await User.findOne({username}).select('+password');

//         if(!user) {
//             return error(res, 400, 'credential_username_invalid', 'Username Not Exists');
//         }
//         else if(await bcrypt.compare(password, user.password)) {
//             const token = jwt.sign(
//                 { user_id: user._id, username },
//                 process.env.TOKEN_KEY,
//                 {
//                     expiresIn: "1d"
//                 }
//             );
//             user.token = token;
//             return success(res, 200, 'Login Success', {"token": token});
//         }
//         else {
//             return error(res, 400, 'credential_password_invalid', 'Invalid Password');
//         }
//     } catch(err) {
//         return error(res, 500, 'error', 'Login Failed', err);
//     }
// }
