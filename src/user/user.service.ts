import { Injectable } from '@nestjs/common';

// TODO :: This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'carlos',
      password: '123456',
    },
    {
      userId: 2,
      username: 'joao',
      password: '654321',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
