/*
 * @Author: prashant.chaudhary
 * @Date: 2023-04-19 17:10:52
 * @Last Modified by:   prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:10:52
 */

import { Field, ObjectType } from '@nestjs/graphql';
import PrimaryEntity from '../common/entities/primary.entity';
import { OtpType } from './otp-config.interface';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'otp_configurations' })
export default class OtpConfig extends PrimaryEntity {
  @Field()
  @Column({ name: 'otp_length' })
  otpLength: number;

  @Field()
  @Column({ name: 'expiration_time' })
  expirationTime: string;

  @Field()
  @Column({ name: 'alphabets', type: 'boolean', default: false })
  alphabets: boolean;

  @Field()
  @Column({ name: 'uppercase', type: 'boolean', default: false })
  upperCase: boolean;

  @Field()
  @Column({ name: 'special_char', type: 'boolean', default: false })
  specialChar: boolean;

  @Field()
  @Column({ name: 'digits', type: 'boolean', default: false })
  digits: boolean;

  @Field()
  @Column({ name: 'type', type: 'enum', enum: OtpType, default: OtpType.WEB })
  type: OtpType;
}
