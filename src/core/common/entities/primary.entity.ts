/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 14:24:16
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:25:21
 */

import CommonEntity from './common.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export default class PrimaryEntity extends CommonEntity {
  @Field()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
}
