import { CreateTaskDto } from '../../task/dto/create-task.dto';
import { Task } from '../../task/entity/task.entity';
import { User } from '../../user/entity/user.entity';
import { UserRole } from '../../user/userRole.enum';

export const UserMockData = [
  {
    userId: 1,
    username: 'manager.test',
    password: '123456',
    role: UserRole.manager,
  },
  {
    userId: 2,
    username: 'technician.test1',
    password: '654321',
    role: UserRole.technician,
  },
  {
    userId: 2,
    username: 'technician.test2',
    password: '123456',
    role: UserRole.technician,
  },
];

const task: Task = {
  id: 1,
  title: 'title333',
  summary: 'summary1133',
  createdAt: new Date(),
  updatedAt: new Date,
  deletedAt: null,
  user: new User(),
};

export const TaskLisMockData: Task[] = [ task ];

export const TaskDtoMockData: CreateTaskDto = new CreateTaskDto();
task.title = `${new Date()} - title`;
task.summary = `${new Date()} - summary`;
