/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 10:39:13
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-20 12:30:05
 */

import { ValidationError } from 'class-validator';
import ValidationException from '../exceptions/validation.exception';

/**
 * https://github.com/typestack/class-validator#validation-errors
 * @param errors
 * @returns
 */
export function format(errors: ValidationError[]) {
  let data: Record<string, any> = {};
  errors.forEach((error) => {
    const response: Record<string, any> = {};
    if (error?.children?.length) {
      response[error.property] = format(error.children);
    } else {
      response[error.property] = Object.entries(error.constraints).map(
        ([key, value]) => {
          return value;
        },
      );
    }
    data = { ...data, ...response };
  });
  return data;
}

export function ErrorFormatter(errors: ValidationError[]) {
  throw new ValidationException(format(errors));
}
