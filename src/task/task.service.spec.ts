import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { Task } from './entity/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskModule } from './task.module';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import {
  TaskDtoMockData,
  TaskLisMockData,
  UserMockData,
} from '../utils/mockData/mockData';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

describe('TaskService', () => {
  let service: TaskService;
  let userService: UserService;
  let app: INestApplication;
  let repo: Repository<Task>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
      imports: [AppModule, TaskModule],
    }).compile();

    service = module.get<TaskService>(TaskService);
    userService = module.get<UserService>(UserService);

    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
    app = module.createNestApplication();
    await app.init();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(repo).toBeDefined();
    expect(app).toBeDefined();
  });

  describe('Task::save', () => {
    it('should create a task', async () => {
      if (process.env.MOCKED_TEST) {
        const saveMock = jest.spyOn(repo, 'save');
        saveMock.mockImplementation((newTask: Task) =>
          Promise.resolve({ ...newTask, ...TaskDtoMockData, ...UserMockData }),
        );
      }

      const userId = UserMockData[0].id;
      // Add a mock on userService.findOneById
      const creatorUser: User = await userService.findOneById(userId);
      expect(creatorUser.id).toBeDefined();
      expect(TaskDtoMockData.title).toBeDefined();
      expect(TaskDtoMockData.summary).toBeDefined();

      const savedTask: Task = await service.save(TaskDtoMockData, creatorUser);
      expect(savedTask.title).toEqual(TaskDtoMockData.title);
      expect(savedTask.summary).toEqual(TaskDtoMockData.summary);
      expect(savedTask.user.id).toBeDefined();
    });
  });

  describe.skip('Task::find', () => {
    it('should find a list of task', async () => {
      if (process.env.MOCKED_TEST) {
        const findMock = jest.spyOn(repo, 'find');
        findMock.mockImplementation(() => Promise.resolve(TaskLisMockData));
      }

      const taskList: Task[] = await service.findAll();
      expect(taskList.length).toBeTruthy();
      expect(taskList[0].title).toBeDefined();
      expect(taskList[0].summary).toBeDefined();
      expect(taskList[0].id).toBeDefined();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});
