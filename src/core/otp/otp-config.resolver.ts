/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-09 15:55:04
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:38:05
 */

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {
  AddOtpConfigurationDto,
  UpdateOtpConfigurationDto,
} from './otp-config.interface';
import OtpConfigService from './otp-config.service';
import OtpConfig from './otp-config.entity';

@Resolver(() => OtpConfig)
export default class OtpConfigResolver {
  constructor(private readonly otpConfigService: OtpConfigService) {}

  @Mutation(() => OtpConfig)
  async addOtpConfig(
    @Args('data') data: AddOtpConfigurationDto,
  ): Promise<OtpConfig> {
    return await this.otpConfigService.addOtpConfig(data);
  }

  @Mutation(() => OtpConfig)
  async updateOtpConfig(
    @Args('id', { type: () => Number }) id: number,
    @Args('data') data: UpdateOtpConfigurationDto,
  ) {
    return await this.otpConfigService.updateOtpConfig(id, data);
  }

  @Query(() => [OtpConfig])
  async getAllOtpConfigurations(): Promise<OtpConfig[]> {
    return await this.otpConfigService.getAllOtpConfig();
  }

  @Query(() => OtpConfig)
  async getOtpConfigurationById(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<OtpConfig> {
    return this.otpConfigService.getOtpConfigById(id);
  }

  @Mutation(() => Int)
  async deleteOtpConfig(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<number> {
    return await this.otpConfigService.deleteOtpConfig(id);
  }
}
