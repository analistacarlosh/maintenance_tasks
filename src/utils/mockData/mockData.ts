import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { Task } from '../../task/entity/task.entity';
import { User } from '../../user/entity/user.entity';
import { UserRole } from '../../user/userRole.enum';

export const ManagerUserMockData = {
  id: 1,
  username: 'manager.test',
  password: '123456',
  role: UserRole.manager,
  active: true,
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
};

export const TechnicianUserMockData = {
  id: 2,
  username: 'technician.test1',
  password: '654321',
  role: UserRole.technician,
  active: true,
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
};

export const UserMockData = [
  ManagerUserMockData,
  TechnicianUserMockData,
  {
    id: 3,
    username: 'technician.test2',
    password: '123456',
    role: UserRole.technician,
    active: true,
    createdAt: new Date(2003, 1, 1),
    updatedAt: new Date(2003, 1, 1),
    deletedAt: null,
  },
];

export const ManagementTaskMockData: Task = {
  id: 1,
  title: 'management Task',
  summary: 'management Task summary',
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
  user: new User(),
};

export const TechnicianTaskMockData: Task = {
  id: 1,
  title: 'management Task',
  summary: 'management Task summary',
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
  user: new User(),
};

export const ManagementTaskLisMockData: Task[] = [
  ManagementTaskMockData,
  ManagementTaskMockData,
];

export const TechnicianTaskLisMockData: Task[] = [
  TechnicianTaskMockData,
  TechnicianTaskMockData,
  TechnicianTaskMockData,
];

export const TaskDtoMockData: CreateTaskDto = new CreateTaskDto();
TaskDtoMockData.title = `${new Date()} - titleMocked`;
TaskDtoMockData.summary = `${new Date()} - summaryMocked`;
