import { Injectable } from '@nestjs/common';
import UserRepository from './users.repository';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.find({ isActive: true, isDeleted: false });
  }
}
