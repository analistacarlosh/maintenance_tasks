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
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantStrings } from '../utils/constants/strings.constants';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { UserRole } from '../user/userRole.enum';
import { TaskResponseDto } from './dto/task-response.dto';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  @ApiTags('task')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: ConstantStrings.swaggerDescription201Response,
    type: TaskResponseDto,
    isArray: false,
  })
  @ApiResponse({
    status: 400,
    description: ConstantStrings.swaggerDescription400BadRequest,
  })
  @ApiResponse({
    status: 401,
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
      throw new BadRequestException(
        ConstantStrings.taskControllerFindOneByidError,
      );
    }

    const newTask: Task = await this.taskService
      .save(createTaskDto, creatorUser)
      .catch((_error: unknown) => {
        // TODO: log this error as an custom exception Sentry
        throw new BadRequestException(ConstantStrings.taskControllerSaveError);
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
  @ApiBearerAuth('JWT')
  @ApiOkResponse({
    description: ConstantStrings.swaggerTaskDescription200Response,
    type: TaskResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: ConstantStrings.swaggerDescription400BadRequest,
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
          throw new BadRequestException(
            ConstantStrings.taskControllerFindAllError,
          );
        });
      return { data: taskList, length: taskList.length };
    }

    const taskList: Task[] = await this.taskService
      .findByUserId(userId)
      .catch((_error: unknown) => {
        // TODO :: log this error as an custom exception Sentry
        throw new BadRequestException(
          ConstantStrings.taskControllerFindByUserIdError,
        );
      });

    return { data: taskList, length: taskList.length };
  }
}
