/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 11:43:43
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-04-19 17:25:36
 */

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export default class CommonEntity {
  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date = new Date();

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date = new Date();

  @Field()
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  @Field()
  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;

  @Field()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Field()
  @Column({ name: 'is_permanent', type: 'boolean', default: false })
  isPermanent: boolean;
}
