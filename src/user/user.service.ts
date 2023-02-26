import { Injectable } from '@nestjs/common';
import { UserMockData } from '../utils/mockData/mockData';

// TODO :: This should be a real user entity connecting in the Database
export type User = any;

@Injectable()
export class UserService {
  private readonly users = UserMockData;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
