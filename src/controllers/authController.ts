import {config} from 'dotenv';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {errorResponse, successResponse} from '../utils/responseHelper';
import AuthenticationService, {
  IAuthentication,
} from '../services/authenticationService';
import jwtDecode from 'jwt-decode';

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
        return errorResponse(res, 400, 'VALIDATION_ERROR', errors.array());
      }

      const token = await AuthenticationService.Login(
        req.body.username,
        req.body.password
      );

      return successResponse(res, 200, 'Login Success', {
        accessToken: token,
      });
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 400 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
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
      const token = req.headers.authorization!.split(' ')[1];
      const username: IAuthentication = jwtDecode(token);
      await AuthenticationService.Logout(
        username.sub,
        req.headers.authorization!.split(' ')[1]
      );
      return successResponse(res, 200, 'Logout Success');
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 400 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
        error
      );
    }
  }
}
