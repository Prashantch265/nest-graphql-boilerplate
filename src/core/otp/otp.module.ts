import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import OtpConfigService from './otp-config.service';
import OTP from './otp.entity';
import OtpResolver from './otp.resolver';

@Module({
  imports: [MikroOrmModule.forFeature([OTP])],
  providers: [OtpConfigService, OtpResolver],
  exports: [],
})
export default class OtpModule {}
