import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ConstantStrings } from '../utils/constants/strings.constants';
import { SwaggerDocumentationHelper } from '../utils/helpers/swagger-documentation.helper';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { UserRole } from '../user/userRole.enum';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: ConstantStrings.swaggerDescription201Response,
    schema: SwaggerDocumentationHelper.OkResponseObjectSchema(
      getSchemaPath(CreateTaskDto),
    ),
  })
  @ApiResponse({
    status: 400,
    description: ConstantStrings.swaggerDescription400BadRequest,
  })
  @ApiResponse({
    status: 500,
    description: ConstantStrings.swaggerDescription500Response,
  })
  async create(@Body() createTaskDto: CreateTaskDto, @Request() request) {
    const { userId, role, username } = request.user;

    const creatorUser: User = await this.userService.findOneById(userId);
    if (creatorUser === undefined) {
      // TODO: log this error as an custom exception Sentry
      throw new BadRequestException('User details not found.');
    }

    const newTask: Task = await this.taskService
      .save(createTaskDto, creatorUser)
      .catch((_error: unknown) => {
        // TODO: log this error as an custom exception Sentry
        throw new BadRequestException('Error to save a new task.');
      });

    if (role === UserRole.technician) {
      const notificationMessage = `The tech: ${username}
      performed the task ${createTaskDto.summary}
      on date: ${newTask.createdAt}.`;

      this.taskService.newTaskPerformedNotification(notificationMessage);
    }

    return { data: newTask };
  }

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: ConstantStrings.swaggerTaskDescription200Response,
    schema: SwaggerDocumentationHelper.OkResponseObjectArraySchema(
      getSchemaPath(CreateTaskDto),
    ),
  })
  @ApiResponse({
    status: 500,
    description: ConstantStrings.swaggerDescription500Response,
  })
  async findAll(@Request() request) {
    const { role, userId } = request.user;

    if (role === UserRole.manager) {
      const taskList: Task[] = await this.taskService
        .findAll()
        .catch((_error: unknown) => {
          // TODO :: log this error as an custom exception Sentry
          throw new BadRequestException('Error to find all tasks.');
        });
      return { data: taskList };
    }

    const taskList: Task[] = await this.taskService
      .findByUserId(userId)
      .catch((_error: unknown) => {
        // TODO :: log this error as an custom exception Sentry
        throw new BadRequestException('Error to find task by user.');
      });

    return { data: taskList };
  }
}
