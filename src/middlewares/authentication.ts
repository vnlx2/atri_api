import {config} from 'dotenv';
import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken';
import redisService from '../services/redisService';
import {errorResponse} from '../utils/responseHelper';

config();

export default () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (
        req.method === 'OPTIONS' &&
        req.headers.origin &&
        req.headers['access-control-request-method']
      ) {
        return next();
      }

      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('TOKEN_NOT_FOUND');
      }
      const validation = verify(token, process.env.TOKEN_KEY!);
      if (!validation) {
        throw new Error('INVALID_TOKEN');
      }
      if (await redisService.get(`blacklist-${token}`)) {
        throw new Error('TOKEN_EXPIRED');
      }
      return next();
    } catch (error) {
      return errorResponse(
        res,
        401,
        error instanceof Error ? error.message : 'UNAUTHORIZED',
        error
      );
    }
  };
};
