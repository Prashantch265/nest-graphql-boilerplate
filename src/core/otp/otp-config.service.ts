import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OTP from './otp-config.entity';
import OtpConfigRepository from './otp-config.repository';
import { RuntimeException } from '@exceptions/runtime.exception';
import {
  AddOtpConfigurationDto,
  UpdateOtpConfigurationDto,
} from './otp-config.interface';
import OtpConfig from './otp-config.entity';

@Injectable()
export default class OtpConfigService {
  constructor(
    @InjectRepository(OTP)
    private readonly otpConfigRepository: OtpConfigRepository,
  ) {}

  async addOtpConfig(data: AddOtpConfigurationDto) {
    const duplicateData = await this.otpConfigRepository.findOne({
      where: { type: data.type },
    });
    if (duplicateData)
      throw new RuntimeException(400, 'duplicateData', 'otp-configuration');
    const resData = await this.otpConfigRepository.save(data);
    return resData;
  }

  async updateOtpConfig(id: number, data: UpdateOtpConfigurationDto) {
    const existingData = await this.otpConfigRepository.findOne({
      where: { id: id },
    });
    if (!existingData)
      throw new RuntimeException(400, 'notFound', 'otp-configuration');
    const updatedData = { ...existingData, ...data };
    const resData = await this.otpConfigRepository.save(updatedData);
    return resData;
  }

  async getAllOtpConfig() {
    const resData = await this.otpConfigRepository.find({
      where: { isActive: true },
      select: [
        'id',
        'type',
        'otpLength',
        'expirationTime',
        'alphabets',
        'digits',
        'specialChar',
      ],
    });
    return resData;
  }

  async getOtpConfigById(id: number) {
    const existingData = await this.otpConfigRepository.findOne({
      where: { id: id, isActive: true },
    });
    if (!existingData)
      throw new RuntimeException(400, 'notFound', 'otp-configuration');
    return existingData;
  }

  async deleteOtpConfig(id: number) {
    const existingData = await this.otpConfigRepository.findOne({
      where: { id: id },
    });
    if (!existingData)
      throw new RuntimeException(400, 'notFound', 'otp-configuration');
    if (existingData.isPermanent === true)
      throw new RuntimeException(400, 'permanentData', 'otp-configuration');
    await this.otpConfigRepository.delete(id);
    return id;
  }
}
