import {config} from 'dotenv';
import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken';

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
      return next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        errorCode: error instanceof Error ? error.message : 'UNAUTHORIZED',
        message: 'Unauthorized.',
      });
    }
  };
};
