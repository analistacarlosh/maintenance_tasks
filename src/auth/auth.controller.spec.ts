import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UserMockData } from '../utils/mockData/mockData';

describe('AuthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Post :: /auth/login', () => {
    it('Should get a login sucefully passing correct credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({
          username: UserMockData[0].username,
          password: UserMockData[0].password,
        })
        .expect(201);
      expect(response.body.access_token).toBeDefined();
    });

    it('Should not make a login with a wrong credentials', async () => {
      await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({
          username: UserMockData[0].username,
          password: 'wrong-password',
        })
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
