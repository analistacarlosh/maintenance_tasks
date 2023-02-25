import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  const repositoryToken = getRepositoryToken(Task);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: repositoryToken,
          useValue: {
            save: jest.fn()
              .mockImplementation((createTaskDto: CreateTaskDto) =>
              Promise.resolve({ _id: '1', ...createTaskDto }),
          ),
            find: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Task::create', () => {

    it('should create a task', async () => {
      const task:CreateTaskDto = new CreateTaskDto();
      task.title = 'title1';
      task.summary = 'summary1';
      const newTask: Task = await service.create(task);
      expect(newTask).toEqual({ _id: '1', ...task });
    });
  
  });

});
