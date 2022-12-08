/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:06:30
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 14:25:10
 */

import { Global, Module } from '@nestjs/common';
import { RequestContextProvider } from './express-http.context';

@Global()
@Module({
  imports: [],
  providers: [RequestContextProvider],
  exports: [RequestContextProvider],
})
export default class ContextModule {}
