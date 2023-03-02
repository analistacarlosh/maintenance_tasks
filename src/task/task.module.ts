import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task_updated_queue',
          queueOptions: { durable: false, noAck: false },
        },
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UserService],
  exports: [TypeOrmModule, ClientsModule],
})
export class TaskModule {}
