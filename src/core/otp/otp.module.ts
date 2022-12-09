import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import OtpConfigService from './otp-config.service';
import OTP from './otp.entity';

@Module({
  imports: [MikroOrmModule.forFeature([OTP])],
  providers: [OtpConfigService],
  exports: [],
})
export default class OtpModule {}
