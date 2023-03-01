import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @Inject('TASK_SERVICE')
    private client: ClientProxy,
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

  async newTaskPerformedNotification(message: string) {
    console.log(`newTaskPerformedNotification :: ${message}`);
    return this.client.send({ cmd: 'newTaskPerformed' }, message);
  }
}
