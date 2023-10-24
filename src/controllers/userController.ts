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
      return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR');
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
        return errorResponse(res, 400, 'VALIDATION_ERROR', errors.array());
      }

      await UserController.userService.storeUser(req.body);
      return successResponse(res, 201, 'Store user success');
    } catch (error) {
      return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', error);
    }
  }

  /**
   * Update User
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async update(req: Request<{}, {}, IUser>, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, 400, 'VALIDATION_ERROR', errors.array());
      }

      await UserController.userService.updateUser(req.body);
      return successResponse(res, 200, 'Update user success');
    } catch (error) {
      return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', error);
    }
  }

  /**
   * Delete User
   *
   * @param req Request
   * @param res Response
   * @return Response
   */
  public static async drop(req: Request, res: Response) {
    try {
      await UserController.userService.deleteUser(req.params.id);
      return successResponse(res, 200, 'Delete user success');
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 404 : 500,
        error instanceof Error ? 'USER_NOT_FOUND' : 'INTERNAL_SERVER_ERROR'
      );
    }
  }
}
