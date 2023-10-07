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
        'INTERNAL_SERVER_ERROR',
        'Internal Server Error',
        error
      );
    }
  }
}
