/*
 * @Author: prashant.chaudhary
 * @Date: 2023-04-14 13:44:55
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-14 14:46:40
 */

import { Module } from '@nestjs/common';
import OtpConfigService from './otp-config.service';
import OtpConfig from './otp-config.entity';
import OtpResolver from './otp-config.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import OtpConfigController from './otp-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OtpConfig])],
  controllers: [OtpConfigController],
  providers: [OtpConfigService, OtpResolver],
  exports: [],
})
export default class OtpModule {}
