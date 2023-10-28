import {config} from 'dotenv';
import {Response} from 'express';
import {ValidationError} from 'express-validator';

config();

type ErrorBody = {
  success: boolean;
  errorCode: string;
  message: string;
  errors?: object;
};

const generateMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'UNAUTHORIZED':
      return 'Unauthorized';
    case 'VALIDATION_ERROR':
      return 'Validation Error';
    case 'TOKEN_NOT_FOUND':
      return 'Token Not Found';
    case 'INVALID_TOKEN':
      return 'Invalid Token';
    case 'TOKEN_EXPIRED':
    case 'jwt expired':
      return 'Token Expired';
    case 'USER_NOT_FOUND':
      return 'User Not Found';
    case 'INVALID_PASSWORD':
      return 'Invalid Password';
    case 'INVALID_ROLE':
      return 'Invalid Role';
    case 'VN_NOT_FOUND':
      return 'Visual Novel Not Found';
    case 'USER_BIRTHDAY_ALREADY_EXISTS':
      return "User's Birthday Already Exists";
    case 'BIRTHDAY_NOT_FOUND':
      return "User's Birthday Not Found";
    default:
      return 'Internal Server Error';
  }
};

export const successResponse = (
  res: Response,
  httpCode: number,
  message: string,
  data?: Array<unknown> | Object
) => {
  return res.status(httpCode).json({
    status: true,
    message: message,
    data: data,
  });
};

export const errorResponse = (
  res: Response,
  httpCode: number,
  errorCode: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: Array<ValidationError> | Error | any
) => {
  const body: ErrorBody = {
    success: false,
    errorCode: errorCode,
    message: generateMessage(errorCode),
  };

  if (errors instanceof Array) {
    body.errors = errors.map((error: ValidationError) => {
      const field = error.type === 'field' ? error.path : '';
      const message = error.msg;
      return {
        field,
        message,
      };
    });
  } else if (process.env.APP_DEBUG!) {
    body.errors = {
      message: errors?.message,
      stacktrace: errors?.stack,
    };
  }

  return res.status(httpCode).json(body);
};
