import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findOneById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
