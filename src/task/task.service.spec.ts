import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
