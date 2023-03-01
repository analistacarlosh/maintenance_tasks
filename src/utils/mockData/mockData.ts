import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { Task } from '../../task/entity/task.entity';
import { User } from '../../user/entity/user.entity';
import { UserRole } from '../../user/userRole.enum';

export const UserMockData = [
  {
    id: 10,
    username: 'manager.test',
    password: '123456',
    role: UserRole.manager,
    active: true,
    createdAt: new Date(2003, 1, 1),
    updatedAt: new Date(2003, 1, 1),
    deletedAt: null,
  },
  {
    id: 11,
    username: 'technician.test1',
    password: '654321',
    role: UserRole.technician,
    active: true,
    createdAt: new Date(2003, 1, 1),
    updatedAt: new Date(2003, 1, 1),
    deletedAt: null,
  },
  {
    id: 12,
    username: 'technician.test2',
    password: '123456',
    role: UserRole.technician,
    active: true,
    createdAt: new Date(2003, 1, 1),
    updatedAt: new Date(2003, 1, 1),
    deletedAt: null,
  },
];

const task: Task = {
  id: 1,
  title: 'titleMocked',
  summary: 'summarMocked',
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
  user: new User(),
};

export const TaskLisMockData: Task[] = [task];

export const TaskDtoMockData: CreateTaskDto = new CreateTaskDto();
TaskDtoMockData.title = `${new Date()} - titleMocked`;
TaskDtoMockData.summary = `${new Date()} - summaryMocked`;
