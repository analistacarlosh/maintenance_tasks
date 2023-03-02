import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import {
  ManagementTaskLisMockData,
  ManagementTaskMockData,
  TechnicianTaskLisMockData,
  TechnicianTaskMockData,
  UserMockData,
} from '../utils/mockData/mockData';

describe('TaskController', () => {
  let app: INestApplication;
  let managerToken: string;
  let technicianToken: string;
  let taskService: TaskService;

  const taskMock = {
    title: 'task1',
    summary: 'easy task',
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    taskService = moduleRef.get<TaskService>(TaskService);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`Post :: /auth/login - Manager Authentication`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: UserMockData[0].username,
        password: UserMockData[0].password,
      })
      .expect(201);
    expect(response.body.access_token).toBeDefined();
    managerToken = response.body.access_token;
  });

  it(`Post :: /auth/login - Technician Authentication`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: UserMockData[1].username,
        password: UserMockData[1].password,
      })
      .expect(201);
    expect(response.body.access_token).toBeDefined();
    technicianToken = response.body.access_token;
  });

  describe('Post :: /task', () => {
    describe('Post :: /task - create a task as a technician user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        await request(app.getHttpServer())
          .post('/task')
          .send(taskMock)
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 400 as doesnt have the required fields`, async () => {
        await request(app.getHttpServer())
          .post('/task')
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(400);
      });

      it(`should return 201 as a technician with all the required fields
      and send the notification to manager`, async () => {
        const saveMock = jest.spyOn(taskService, 'save');
        saveMock.mockImplementation(() =>
          Promise.resolve(TechnicianTaskMockData),
        );

        const newTaskPerformedNotificationMock = jest.spyOn(
          taskService,
          'newTaskPerformedNotification',
        );
        newTaskPerformedNotificationMock.mockImplementation(() =>
          Promise.resolve(),
        );

        await request(app.getHttpServer())
          .post('/task')
          .send(taskMock)
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(201)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body.data.title).toBe(TechnicianTaskMockData.title);
            expect(response.body.data.summary).toBe(
              TechnicianTaskMockData.summary,
            );
            expect(response.body.data.id).toBe(TechnicianTaskMockData.id);
          });

        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(newTaskPerformedNotificationMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('Post :: /task - create a task as a manager user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        await request(app.getHttpServer())
          .post('/task')
          .send(taskMock)
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 400 as doesnt have the required fields`, async () => {
        await request(app.getHttpServer())
          .post('/task')
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(400);
      });

      it(`should return 201 as a manager with all the required fields
      and not send the notification`, async () => {
        const saveMock = jest.spyOn(taskService, 'save');
        saveMock.mockImplementation(() =>
          Promise.resolve(ManagementTaskMockData),
        );

        const newTaskPerformedNotificationMock = jest.spyOn(
          taskService,
          'newTaskPerformedNotification',
        );
        newTaskPerformedNotificationMock.mockImplementation(() =>
          Promise.resolve(),
        );

        await request(app.getHttpServer())
          .post('/task')
          .send(taskMock)
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(201)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body.data.title).toBe(ManagementTaskMockData.title);
            expect(response.body.data.summary).toBe(
              ManagementTaskMockData.summary,
            );
            expect(response.body.data.id).toBe(ManagementTaskMockData.id);
          });

        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(newTaskPerformedNotificationMock).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Get :: /task', () => {
    describe('/task as a technician user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        await request(app.getHttpServer())
          .get('/task')
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 200 and a list of task from findByUserId`, async () => {
        const findByUserIdMock = jest.spyOn(taskService, 'findByUserId');
        findByUserIdMock.mockImplementation(() =>
          Promise.resolve(TechnicianTaskLisMockData),
        );

        const findAllMock = jest.spyOn(taskService, 'findAll');
        findAllMock.mockImplementation(() =>
          Promise.resolve(ManagementTaskLisMockData),
        );

        await request(app.getHttpServer())
          .get('/task')
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body.data.length).toBe(3);
          });

        expect(findByUserIdMock).toHaveBeenCalledTimes(1);
        expect(findAllMock).toHaveBeenCalledTimes(0);
      });
    });

    describe('/task as a manager user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        request(app.getHttpServer())
          .get('/task')
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 200 and a list of task from findAll`, async () => {
        const findAllMock = jest.spyOn(taskService, 'findAll');
        findAllMock.mockImplementation(() =>
          Promise.resolve(ManagementTaskLisMockData),
        );

        const findByUserIdMock = jest.spyOn(taskService, 'findByUserId');
        findByUserIdMock.mockImplementation(() =>
          Promise.resolve(TechnicianTaskLisMockData),
        );

        await request(app.getHttpServer())
          .get('/task')
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body.data.length).toBe(2);
          });

        expect(findAllMock).toHaveBeenCalledTimes(1);
        expect(findByUserIdMock).toHaveBeenCalledTimes(0);
      });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});
