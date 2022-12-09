/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 14:24:16
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-09 15:43:25
 */

import CommonEntity from './common.entity';
import { PrimaryKey } from '@mikro-orm/core';
import { Field, Int } from '@nestjs/graphql';

export default class PrimaryEntity extends CommonEntity {
  @Field((type) => Int)
  @PrimaryKey({ name: 'id', autoincrement: true })
  id: number;
}
