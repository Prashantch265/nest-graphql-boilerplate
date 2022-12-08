/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 15:36:21
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 15:47:06
 */

import { EntityRepository } from '@mikro-orm/core';
import User from './users.entity';

/**
 * Using custom repository is not mandatory it's all about preference. But if you want to use it then this how you should create one.
 * Now go back to your entity file and pass this repository reference inside a callback so we will not run into circular dependency issues when using entity references inside that repository.
 */
export default class UserRepository extends EntityRepository<User> {
  async findOneByField(where = {}, relations = []) {
    where = { ...where, isDeleted: false, isActive: true };
    return super.findOne(where, {});
  }
}
