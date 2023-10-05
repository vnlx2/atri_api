import {config} from 'dotenv';
import {Response} from 'express';
import {FieldValidationError} from 'express-validator';

config();

type ErrorBody = {
  success: boolean;
  errorCode: string;
  message: string;
  errors?: object;
};

export const successResponse = (
  res: Response,
  httpCode: number,
  message: string,
  data: Array<unknown> | Object
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
  message: string,
  errors?: Array<FieldValidationError> | Error | any
) => {
  const body: ErrorBody = {
    success: false,
    errorCode: errorCode,
    message: message,
  };

  if (errors instanceof Array) {
    body.errors = errors.map((error: FieldValidationError) => {
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
