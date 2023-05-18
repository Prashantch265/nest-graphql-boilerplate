/*
 * @Author: prashant.chaudhary
 * @Date: 2023-04-14 14:43:35
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-14 14:45:39
 */

import { Controller, Get } from '@nestjs/common';
import OtpConfigService from './otp-config.service';

@Controller('/otp-config')
export default class OtpConfigController {
  constructor(private readonly otpConfigService: OtpConfigService) {}

  @Get()
  async getAllOtpConfig() {
    return this.otpConfigService.getAllOtpConfig();
  }
}
