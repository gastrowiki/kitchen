import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from 'common';

export const validateRequestData = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, _, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const fieldErrors = errors.reduce((FEs, error: ValidationError) => {
          const errorMessage = Object.values(error.constraints).join(', ');
          return { ...FEs, [error.property]: errorMessage };
        }, {});
        next(new HttpException(400, 'Something is wrong with the data you entered.', fieldErrors));
      } else {
        next();
      }
    });
  };
};
