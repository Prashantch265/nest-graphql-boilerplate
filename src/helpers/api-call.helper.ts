/*
 * @Author: prashant.chaudhary
 * @Date: 2023-04-24 16:41:28
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-24 16:45:55
 */

import { RuntimeException } from '@exceptions/runtime.exception';
import { Injectable, RequestMethod } from '@nestjs/common';
import axios from 'axios';
import { RequestOptions } from 'http';

@Injectable()
export class ApiCallHelper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async call(
    requestMethod: RequestMethod,
    url: string,
    headers: any | null,
    body: any | null,
  ): Promise<any> {
    try {
      const options: RequestOptions | any = {
        method: requestMethod ? requestMethod : RequestMethod.GET,
        url: url,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: body,
      };
      options.headers = headers
        ? headers
        : { 'content-type': 'application/json' };

      return new Promise((resolve, reject) => {
        axios(options)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      throw new RuntimeException(400, err.message);
    }
  }
}
