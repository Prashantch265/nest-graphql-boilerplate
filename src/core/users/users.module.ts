/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 14:24:47
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 17:47:15
 */

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import User from './users.entity';
import UserService from './users.service';
import UserResolver from './users.resolver';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export default class UserModule {}
