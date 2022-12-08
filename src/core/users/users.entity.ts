/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-08 14:24:34
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2022-12-08 17:30:31
 */

import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import CommonEntity from '../common/entities/common.entity';
import UserRepository from './users.repository';

@Entity({ tableName: 'users', customRepository: () => UserRepository })
export default class User extends CommonEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  uuid: string;

  @Property({ name: 'full_name' })
  fullName: string;

  @Property({ name: 'contact' })
  contact: string;

  @Property({ name: 'email' })
  email: string;

  @Property({ name: 'password' })
  password: string;

  @Property({ name: 'user_name' })
  userName: string;

  /**
   * Inferring custom repository type
   * To have the em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: UserRepository;
}
