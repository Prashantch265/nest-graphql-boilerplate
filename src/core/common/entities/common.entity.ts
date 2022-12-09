/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:43:43
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-09 15:44:27
 */

import { Property } from '@mikro-orm/core';
import { Field } from '@nestjs/graphql';

export default class CommonEntity {
  @Field()
  @Property({ name: 'created_at' })
  createdAt: Date = new Date();

  @Field()
  @Property({ name: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @Field()
  @Property({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;

  @Field()
  @Property({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Field()
  @Property({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Field()
  @Property({ name: 'is_permanent', type: 'boolean', default: false })
  isPermanent: boolean;
}
