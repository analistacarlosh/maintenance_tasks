import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // TODO :: Add swagger
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const newTask: Task = await this.taskService.create(createTaskDto);
    return { data: newTask };
  }
}
