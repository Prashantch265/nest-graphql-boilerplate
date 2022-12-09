import { Entity, Enum, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import PrimaryEntity from '../common/entities/primary.entity';
import { OtpType } from './otp.interface';

@ObjectType()
@Entity({ tableName: 'otp_configurations' })
export default class OTP extends PrimaryEntity {
  @Field()
  @Property({ name: 'otp_length' })
  otpLength: number;

  @Field()
  @Property({ name: 'expiration_time' })
  expirationTime: string;

  @Field()
  @Property({ name: 'alphabets', type: 'boolean', default: false })
  alphabets: boolean;

  @Field()
  @Property({ name: 'uppercase', type: 'boolean', default: false })
  upperCase: boolean;

  @Field()
  @Property({ name: 'special_char', type: 'boolean', default: false })
  specialChar: boolean;

  @Field()
  @Property({ name: 'digits', type: 'boolean', default: false })
  digits: boolean;

  @Field()
  @Enum({ name: 'type', default: OtpType.WEB })
  type: OtpType;
}
