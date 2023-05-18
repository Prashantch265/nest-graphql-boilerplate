/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-09 10:57:22
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:49:12
 */

import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

/**
 * With Graphql decorators of class validator doesn't work
 * we need to use @Field() and provide arguments like type an nullable
 */

export enum OtpType {
  WEB = 'web',
  MOBILE = 'mobile',
}

registerEnumType(OtpType, { name: 'OtpType' });

@InputType()
export class AddOtpConfigurationDto {
  @Field(() => Int)
  // @IsNotEmpty()
  @IsInt()
  otpLength: number;

  @Field()
  // @IsNotEmpty()
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

  @Field(() => OtpType)
  // @IsNotEmpty()
  type: OtpType;
}

@InputType()
export class UpdateOtpConfigurationDto {
  @Field({ nullable: true })
  @IsInt()
  otpLength?: number;

  @Field({ nullable: true })
  @IsString()
  expirationTime?: string;

  @Field({ nullable: true })
  @IsBoolean()
  digits?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  alphabets?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  upperCase?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  specialChar?: boolean;

  @Field({ nullable: true })
  type?: OtpType;
}

@InputType()
export class GetNewOtpParamsDto {
  @Field()
  // @IsNotEmpty()
  type: OtpType;

  @Field()
  @IsEmail()
  email?: string;

  @Field()
  @IsString()
  phoneNo?: string;
}

@InputType()
export class RecievedOtpDto {
  @Field(() => OtpType)
  // @IsNotEmpty()
  type: OtpType;

  @Field()
  // @IsNotEmpty()
  @IsString()
  otp: string;

  @Field()
  @IsEmail()
  email?: string;

  @Field()
  @IsString()
  phoneNo?: string;
}
