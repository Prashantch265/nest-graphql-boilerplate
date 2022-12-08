/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 14:24:16
 * @Last Modified by:   prashant.chaudhary
 * @Last Modified time: 2022-12-08 14:24:16
 */

import CommonEntity from './common.entity';
import { PrimaryKey } from '@mikro-orm/core';

export default class PrimaryEntity extends CommonEntity {
  @PrimaryKey({ name: 'id', autoincrement: true })
  id: number;
}
