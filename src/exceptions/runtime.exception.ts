/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-09 11:31:50
 * @Last Modified by:   prashant.chaudhary
 * @Last Modified time: 2022-12-09 11:31:50
 */

import { HttpException, HttpStatus } from '@nestjs/common';

export class RuntimeException extends HttpException {
  private readonly source: string | string[];
  constructor(
    status: HttpStatus,
    response: string,
    source?: string | string[],
  ) {
    super(response, status);
    this.source = source;
  }
}
