/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-05 14:42:39
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-24 16:56:44
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class StrategyConfigs {
  constructor(private readonly configService: ConfigService) {}

  getJwtConfig() {
    return this.configService.get('jwt');
  }

  getFacebookStrategyConfig() {
    return this.configService.get('oauth.facebook');
  }

  getGoogleStrategyConfig() {
    return this.configService.get('oauth.google');
  }
}
