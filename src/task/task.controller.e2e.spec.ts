import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('TaskControllerE2E', () => {
  let app: INestApplication;

  const taskMock = {
    title: 'task1',
    summary: 'easy task',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TaskService)
      .useValue({
        create: () => taskMock,
        findAll: () => [
          {
            id: 1,
            title: 'Task #1',
            summary: 'description #1',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: null,
            deletedAt: null,
          },
        ],
      })
      .compile();

    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/POST', () => {
    it(`/POST should return 201 as has all the required fields`, () => {
      return request(app.getHttpServer())
        .post('/task')
        .send(taskMock)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect({ data: taskMock });
    });

    it(`/POST should 400 as doesnt have the required fields`, () => {
      return request(app.getHttpServer()).post('/task').expect(400);
    });
  });

  describe('/GET All', () => {
    it(`/GET should return 200 and a list of task`, () => {
      return request(app.getHttpServer())
        .get('/task')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
