import { FindOptions } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RuntimeException } from 'src/exceptions/runtime.exception';
import OTP from './otp.entity';
import { OtpConfigurationDto } from './otp.interface';

@Injectable()
export default class OtpConfigService {
  /**
   * We can use @InjectRepository() like we do with TypeORM v^3.0 instead of creating custom repository.
   * @param otpRepository
   */
  constructor(
    @InjectRepository(OTP)
    private readonly otpRepository: EntityRepository<OTP>,
  ) {}

  async findOneByField(where = {}, options: FindOptions<OTP> = {}) {
    where = { ...where, isDeleted: false, isActive: true };
    return this.otpRepository.findOne(where, options);
  }

  async addOtpConfig(data: OtpConfigurationDto) {
    const duplicateData = await this.findOneByField({ type: data.type });
    if (duplicateData)
      throw new RuntimeException(400, 'duplicateData', 'otp-configuration');
    const resData = await this.otpRepository.persist(data);
    return resData;
  }

  async updateOtpConfig(id: number, data: OtpConfigurationDto) {
    const existingData = await this.findOneByField({ id: id });
    if (!existingData)
      throw new RuntimeException(400, 'notFound', 'otp-configuration');
    const updatedData = { ...existingData, ...data };
    const resData = await this.otpRepository.persist(updatedData);
    return resData;
  }

  async getAllOtpConfig() {
    const resData = await this.otpRepository.find(
      {
        isActive: true,
        isDeleted: false,
      },
      {
        populate: ['id', 'type', 'otpLength', 'expirationTime'],
      },
    );
    return resData;
  }

  async getOtpConfigById(id: number) {
    const existingData = await this.findOneByField({ id: id });
    if (!existingData)
      throw new RuntimeException(400, 'notFount', 'otp-configuration');
    const resData = await this.findOneByField({ id: id });
    return resData;
  }

  async deleteOtpConfig(id: number) {
    const existingData = await this.findOneByField({ id: id });
    if (!existingData)
      throw new RuntimeException(400, 'notFount', 'otp-configuration');
    if (existingData.isPermanent === true)
      throw new RuntimeException(400, 'permanentData', 'otp-configuration');
    await this.otpRepository.nativeDelete(id);
    return id;
  }
}
