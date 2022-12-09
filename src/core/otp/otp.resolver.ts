/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-09 15:55:04
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-09 16:49:35
 */

import { Resolver, Query } from '@nestjs/graphql';
import OtpConfigService from './otp-config.service';
import OTP from './otp.entity';
import { OtpConfigurationDto } from './otp.interface';

@Resolver((of) => [OTP, OtpConfigurationDto])
export default class OtpResolver {
  constructor(private readonly otpConfigService: OtpConfigService) {}

  @Query((returns) => [OTP])
  async getAllOtpConfigurations(): Promise<OTP[]> {
    return await this.otpConfigService.getAllOtpConfig();
  }
}
