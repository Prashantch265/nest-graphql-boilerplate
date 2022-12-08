/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:43:43
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 14:29:19
 */

import { Property } from '@mikro-orm/core';

export default class CommonEntity {
  @Property({ name: 'created_at' })
  createdAt: Date = new Date();

  @Property({ name: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @Property({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;

  @Property({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Property({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
