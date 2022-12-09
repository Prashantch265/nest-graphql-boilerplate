/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-09 10:57:22
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-09 15:51:58
 */

import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum OtpType {
  WEB = 'web',
  MOBILE = 'mobile',
}

@ObjectType()
export class OtpConfigurationDto {
  @Field()
  @IsNotEmpty()
  @IsInt()
  otpLength: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  expirationTime: string;

  @Field()
  @IsBoolean()
  digits: boolean;

  @Field()
  @IsBoolean()
  alphabets: boolean;

  @Field()
  @IsBoolean()
  upperCase: boolean;

  @Field()
  @IsBoolean()
  specialChar: boolean;

  @Field((type) => OtpType)
  @IsNotEmpty()
  type: OtpType;
}

export class GetNewOtpParamsDto {
  @Field()
  @IsNotEmpty()
  type: OtpType;

  @Field()
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field()
  @IsOptional()
  @IsString()
  phoneNo?: string;
}

export class RecievedOtpDto {
  @Field((type) => OtpType)
  @IsNotEmpty()
  type: OtpType;

  @Field()
  @IsNotEmpty()
  @IsString()
  otp: string;

  @Field()
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field()
  @IsOptional()
  @IsString()
  phoneNo?: string;
}
