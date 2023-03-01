import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TaskController],
  providers: [TaskService, UserService],
  exports: [TypeOrmModule],
})
export class TaskModule {}
