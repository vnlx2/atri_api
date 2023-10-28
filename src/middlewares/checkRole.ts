import {NextFunction, Request, Response} from 'express';
import jwtDecode from 'jwt-decode';
import {IAuthentication} from '../services/authenticationService';
import {errorResponse} from '../utils/responseHelper';

const getUserRole = (token: string) => {
  const decode = jwtDecode(token) as IAuthentication;
  return decode.role;
};

export default (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentLoggedRole = getUserRole(req.headers.authorization!);
    if (currentLoggedRole !== role) {
      return errorResponse(res, 403, 'UNAUTHORIZED');
    }
    return next();
  };
};
