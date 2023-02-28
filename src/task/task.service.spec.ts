import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { Task } from './entity/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskModule } from './task.module';
import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { TaskDtoMockData, TaskLisMockData } from '../utils/mockData/mockData';

describe('TaskService', () => {
  let service: TaskService;
  let app: INestApplication;
  let repo: Repository<Task>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ TaskService ],
      imports: [ AppModule, TaskModule ]
    }).compile();

    service = module.get<TaskService>(TaskService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
    app = module.createNestApplication();
    await app.init();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(app).toBeDefined();
  });

  describe('Task::save', () => {
    it('should create a task', async () => {

      if(process.env.MOCKED_TEST) {
        const saveMock = jest.spyOn(repo, 'save');
        saveMock.mockImplementation((newTask: Task) => 
        Promise.resolve({ ...newTask, ...TaskDtoMockData }));
      }

      const savedTask: Task = await service.save(TaskDtoMockData);
      expect(savedTask).toBeDefined();
      expect(savedTask.title).toEqual(TaskDtoMockData.title);
    });
  });

  describe.skip('Task::find', () => {
    it('should find a list of task', async () => {
    
      if(process.env.MOCKED_TEST) {
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
