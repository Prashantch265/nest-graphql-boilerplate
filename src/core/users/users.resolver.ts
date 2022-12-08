import { Query } from '@nestjs/common';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './users.model';
import UserService from './users.service';

@Resolver((of) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField()
  async user() {
    return this.userService.getAllUsers();
  }
}
