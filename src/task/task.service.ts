import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async save(createTaskDto: CreateTaskDto, creator: User): Promise<Task> {
    const newUser: User = new User();
    return await this.taskRepository.save({
      ...newUser,
      ...createTaskDto,
      user: creator,
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
