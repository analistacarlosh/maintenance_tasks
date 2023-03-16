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
  TechnicianUserMockData,
  ManagerUserMockData,
} from '../utils/mockData/mockData';
import { JwtAuthGuard } from '../auth/guard/jwt-auth-guard';

describe('TaskController', () => {
  let app: INestApplication;
  let managerToken: string;
  let technicianToken: string;
  let taskService: TaskService;
  let jwtAuthGuard: JwtAuthGuard;

  const taskMock = {
    title: 'task1',
    summary: 'easy task',
  };

  const technicianUserRequestMockData = {
    userId: TechnicianUserMockData.id,
    username: TechnicianUserMockData.username,
    role: TechnicianUserMockData.role,
  };

  const managerUserRequestMockData = {
    userId: ManagerUserMockData.id,
    username: ManagerUserMockData.username,
    role: ManagerUserMockData.role,
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    taskService = moduleRef.get<TaskService>(TaskService);
    jwtAuthGuard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Post :: /task', () => {
    describe('Post :: /task - create a task as a technician user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        await request(app.getHttpServer())
          .post('/v1/task')
          .send(taskMock)
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 400 as doesnt have the required fields`, async () => {
        const handleRequestMock = jest
          .spyOn(jwtAuthGuard, 'handleRequest')
          .mockImplementation(() => technicianUserRequestMockData);

        await request(app.getHttpServer())
          .post('/v1/task')
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(400);

        expect(handleRequestMock).toHaveBeenCalledTimes(1);
      });

      it(`should return 201 as a technician with all the required fields
      and send the notification to manager`, async () => {
        const handleRequestMock = jest
          .spyOn(jwtAuthGuard, 'handleRequest')
          .mockImplementation(() => technicianUserRequestMockData);

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
          .post('/v1/task')
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

        expect(handleRequestMock).toHaveBeenCalledTimes(1);
        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(newTaskPerformedNotificationMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('Post :: /task - create a task as a manager user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        await request(app.getHttpServer())
          .post('/v1/task')
          .send(taskMock)
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 400 as doesnt have the required fields`, async () => {
        const handleRequestMock = jest
          .spyOn(jwtAuthGuard, 'handleRequest')
          .mockImplementation(() => managerUserRequestMockData);

        await request(app.getHttpServer())
          .post('/v1/task')
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(400);

        expect(handleRequestMock).toHaveBeenCalledTimes(1);
      });

      it(`should return 201 as a manager with all the required fields
      and not send the notification`, async () => {
        const handleRequestMock = jest
          .spyOn(jwtAuthGuard, 'handleRequest')
          .mockImplementation(() => managerUserRequestMockData);

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
          .post('/v1/task')
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

        expect(handleRequestMock).toHaveBeenCalledTimes(1);
        expect(saveMock).toHaveBeenCalledTimes(1);
        expect(newTaskPerformedNotificationMock).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Get :: /task', () => {
    describe('/task as a technician user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        await request(app.getHttpServer())
          .get('/v1/task')
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 200 and a list of task from findByUserId`, async () => {
        const handleRequestMock = jest
          .spyOn(jwtAuthGuard, 'handleRequest')
          .mockImplementation(() => technicianUserRequestMockData);

        const findByUserIdMock = jest.spyOn(taskService, 'findByUserId');
        findByUserIdMock.mockImplementation(() =>
          Promise.resolve(TechnicianTaskLisMockData),
        );

        const findAllMock = jest.spyOn(taskService, 'findAll');
        findAllMock.mockImplementation(() =>
          Promise.resolve(ManagementTaskLisMockData),
        );

        await request(app.getHttpServer())
          .get('/v1/task')
          .set('Authorization', `Bearer ${technicianToken}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body.data.length).toBe(3);
          });

        expect(handleRequestMock).toHaveBeenCalledTimes(1);
        expect(findByUserIdMock).toHaveBeenCalledTimes(1);
        expect(findAllMock).toHaveBeenCalledTimes(0);
      });
    });

    describe('/task as a manager user', () => {
      it(`should return 401 as it is not authenticated`, async () => {
        request(app.getHttpServer())
          .get('/v1/task')
          .expect(401)
          .expect('Content-Type', /json/);
      });

      it(`should return 200 and a list of task from findAll`, async () => {
        const handleRequestMock = jest
          .spyOn(jwtAuthGuard, 'handleRequest')
          .mockImplementation(() => managerUserRequestMockData);

        const findAllMock = jest.spyOn(taskService, 'findAll');
        findAllMock.mockImplementation(() =>
          Promise.resolve(ManagementTaskLisMockData),
        );

        const findByUserIdMock = jest.spyOn(taskService, 'findByUserId');
        findByUserIdMock.mockImplementation(() =>
          Promise.resolve(TechnicianTaskLisMockData),
        );

        await request(app.getHttpServer())
          .get('/v1/task')
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body.data.length).toBe(2);
          });

        expect(handleRequestMock).toHaveBeenCalledTimes(1);
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
