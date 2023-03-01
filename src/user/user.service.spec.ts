import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { UserModule } from './user.module';
import { UserMockData } from '../utils/mockData/mockData';

describe('UsersService', () => {
  let service: UserService;
  let app: INestApplication;
  let repo: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [AppModule, UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(app).toBeDefined();
  });

  describe('User::findOneById', () => {
    it('findOneById :: should return a valid User', async () => {
      const userId = UserMockData[0].id;

      if (process.env.MOCKED_TEST) {
        const userMocked = UserMockData[0];
        const newUser: User = new User();

        const findOneMock = jest.spyOn(repo, 'findOneBy');
        findOneMock.mockImplementation(() =>
          Promise.resolve({ ...newUser, ...userMocked }),
        );
      }

      const user: User = await service.findOneById(userId);
      expect(user.id).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.password).toBeDefined();
      expect(user.role).toBeDefined();
    });

    it('findOneById :: should return null with an invalid id', async () => {
      if (process.env.MOCKED_TEST) {
        const findOneMock = jest.spyOn(repo, 'findOneBy');
        findOneMock.mockImplementation(() => Promise.resolve(null));
      }

      const user: User = await service.findOneById(0);
      expect(user).toBeNull();
    });
  });

  describe('User::findOneByUsername', () => {
    it('findOneByUsername :: should return a valid User', async () => {
      const username = UserMockData[0].username;

      if (process.env.MOCKED_TEST) {
        const userMocked = UserMockData[0];
        const newUser: User = new User();

        const findOneMock = jest.spyOn(repo, 'findOneBy');
        findOneMock.mockImplementation(() =>
          Promise.resolve({ ...newUser, ...userMocked }),
        );
      }

      const user: User = await service.findOneByUsername(username);
      expect(user.id).toBeDefined();
      expect(user.username).toBeDefined();
      expect(user.password).toBeDefined();
      expect(user.role).toBeDefined();
    });

    it('findOneByUsername :: should return null with an invalid username', async () => {
      if (process.env.MOCKED_TEST) {
        const findOneMock = jest.spyOn(repo, 'findOneBy');
        findOneMock.mockImplementation(() => Promise.resolve(null));
      }

      const user: User = await service.findOneByUsername('-');
      expect(user).toBeNull();
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });
});
