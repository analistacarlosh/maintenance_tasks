import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('TaskControllerE2E', () => {
  let app: INestApplication;
  
  const taskMock = {
    title: 'title',
    summary: 'summary'
  };

  const taskService = { create: () => taskMock };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TaskService)
      .useValue(taskService)
      .compile();

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
      return request(app.getHttpServer())
        .post('/task')
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});