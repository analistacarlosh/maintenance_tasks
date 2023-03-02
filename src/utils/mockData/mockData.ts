import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { Task } from '../../task/entity/task.entity';
import { User } from '../../user/entity/user.entity';
import { UserRole } from '../../user/userRole.enum';

const managerUserMockData = {
  id: 10,
  username: 'manager.test',
  password: '123456',
  role: UserRole.manager,
  active: true,
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
};

const technicianUserMockData = {
  id: 11,
  username: 'technician.test1',
  password: '654321',
  role: UserRole.technician,
  active: true,
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
};

export const UserMockData = [
  managerUserMockData,
  technicianUserMockData,
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

const managementTask: Task = {
  id: 1,
  title: 'management Task',
  summary: 'management Task summary',
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
  user: new User(),
};

const technicianTask: Task = {
  id: 1,
  title: 'management Task',
  summary: 'management Task summary',
  createdAt: new Date(2003, 1, 1),
  updatedAt: new Date(2003, 1, 1),
  deletedAt: null,
  user: new User(),
};

export const ManagementTaskLisMockData: Task[] = [
  managementTask,
  managementTask,
];

export const TechnicianTaskLisMockData: Task[] = [
  technicianTask,
  technicianTask,
  technicianTask,
];

export const TaskDtoMockData: CreateTaskDto = new CreateTaskDto();
TaskDtoMockData.title = `${new Date()} - titleMocked`;
TaskDtoMockData.summary = `${new Date()} - summaryMocked`;
