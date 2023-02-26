import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
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

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
  async create(@Body() createTaskDto: CreateTaskDto) {
    const newTask: Task = await this.taskService.create(createTaskDto);
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
  async findAll() {
    const taskList: Task[] = await this.taskService.findAll();
    return { data: taskList };
  }
}
