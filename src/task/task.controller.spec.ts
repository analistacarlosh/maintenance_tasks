import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import { UserMockData } from '../utils/mockData/mockData';

describe('TaskController', () => {
  let app: INestApplication;
  let token: string;

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

  it(`/POST Authentication`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: UserMockData[0].username,
        password: UserMockData[0].password,
      })
      .expect(201);
    expect(response.body.access_token).toBeDefined();
    token = response.body.access_token;
  });

  describe('/POST', () => {
    it(`/POST should return 201 as has all the required fields`, async () => {
      return request(app.getHttpServer())
        .post('/task')
        .send(taskMock)
        .set('Authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect({ data: taskMock });
    });

    it(`/POST should return 400 as doesnt have the required fields`, () => {
      return request(app.getHttpServer())
        .post('/task')
        .set('Authorization', 'Bearer ' + token)
        .expect(400);
    });
  });

  describe('/GET All', () => {
    it(`/GET should return 200 and a list of task`, async () => {
      return request(app.getHttpServer())
        .get('/task')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it(`/GET should return 401 as it is not authenticated`, () => {
      return request(app.getHttpServer())
        .get('/task')
        .expect(401)
        .expect('Content-Type', /json/);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
