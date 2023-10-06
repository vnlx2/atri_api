import {Request, Response} from 'express';
import {errorResponse, successResponse} from '../utils/responseHelper';
import UserService from '../services/userService';
import {validationResult} from 'express-validator';
import {IUser} from '../models/User';

export default class UserController {
  private static readonly userService = new UserService();
  /**
   * Get All Users
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async all(req: Request, res: Response) {
    try {
      const users = await UserController.userService.getAllUsers();
      if (users.length === 0) {
        return successResponse(res, 200, 'Empty Users', []);
      }
      return successResponse(res, 200, 'Fetch users success', users);
    } catch (error) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Internal Server Error'
      );
    }
  }

  /**
   * Get User Detai;
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async detail(req: Request, res: Response) {
    try {
      const user = await UserController.userService.getUserById(req.params.id);
      return successResponse(res, 200, 'Fetch user success', user);
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 404 : 500,
        error instanceof Error ? 'USER_NOT_FOUND' : 'INTERNAL_SERVER_ERROR',
        error instanceof Error ? 'User not found' : 'Internal Server Error'
      );
    }
  }

  /**
   * Store User
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async store(req: Request<{}, {}, IUser>, res: Response) {
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

      await UserController.userService.storeUser(req.body);
      return successResponse(res, 201, 'Store user success');
    } catch (error) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Internal Server Error',
        error
      );
    }
  }
}
// import { error, success } from '../utils/responseHelper.js';
// import userService from '../services/userService.js';

// // Show All Users
// export const all = async (req, res) => {
//     try {
//         const users = await userService.all();
//         success(res, users.code, "Fetch Users Data Success", users.data);
//     } catch (err) {
//         if(err['code'] !== undefined) {
//             return error(res, err.code, err.name, err.message, err);
//         }
//         error(res, 500, 'FETCH_FAILED', 'Fetch Users Data Failed', err);
//     }
// }

// // Fetch User Data
// export const show = async (req, res) => {
//     try {
//         const user = await userService.detail(req.query.id);
//         return success(res, user.code, "Fetch User Data Success", user.data);
//     } catch (err) {
//         if(err['code'] !== undefined) {
//             return error(res, err.code, err.name, err.message, err);
//         }
//         error(res, 500, 'FETCH_FAILED', 'Fetch User Data Failed', err);
//     }
// }

// // Check username exists
// export const checkUsernameExists = async (req, res) => {
//     try {
//         const isUsernameExists = await userService.checkUsernameExists(req.body.username);
//         return success(res, 200, "Check username exists success", isUsernameExists);
//     } catch (err) {
//         if(err['code'] !== undefined) {
//             return error(res, err.code, err.name, err.message, err);
//         }
//         error(res, 500, 'FETCH_FAILED', 'Fetch User Data Failed', err);
//     }
// }

// // Store User
// export const store = async (req, res) => {
//     try {
//         await userService.store(req.body);
//         return success(res, 201, "Store User Data Success");
//     } catch (err) {
//         if(err['code'] !== undefined) {
//             return error(res, err.code, err.name, err.message, err);
//         }
//         error(res, 500, 'STORE_FAILED', 'Store Users Data Failed', err);
//     }
// }

// // Update User
// export const update = async (req, res) => {
//     try {
//         await userService.update(req.body);
//         return success(res, 200, "Update User Data Success");
//     } catch (err) {
//         if(err['code'] !== undefined) {
//             return error(res, err.code, err.name, err.message, err);
//         }
//         error(res, 500, 'UPDATE_FAILED', 'Update Users Data Failed', err);
//     }
// }

// // Delete User
// export const drop = async (req, res) => {
//     try {
//         await userService.drop(req.query.id);
//         success(res, 200, "Delete Users Data Success");
//     } catch (err) {
//         if(err['code'] !== undefined) {
//             return error(res, err.code, err.name, err.message, err);
//         }
//         error(res, 500, 'DELETE_FAILED', 'Delete Users Data Failed', err);
//     }
// }
