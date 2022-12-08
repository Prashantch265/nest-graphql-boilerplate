/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:08:33
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 14:25:36
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import readConfigurations from './read-configs';

@Module({
  imports: [
    {
      ...ConfigModule.forRoot({ load: [() => readConfigurations()] }),
      global: true,
    },
  ],
  providers: [],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
