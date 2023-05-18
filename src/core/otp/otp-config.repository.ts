/*
 * @Author: prashant.chaudhary
 * @Date: 2023-04-14 13:49:20
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:33:02
 */

import { FindOneOptions, Repository } from 'typeorm';
import OTP from './otp-config.entity';

export default class OtpConfigRepository extends Repository<OTP> {
  async findOneByField(options: FindOneOptions) {
    const { where } = options;
    options.where = { ...where, isActive: true };
    return super.findOne(options);
  }
}
