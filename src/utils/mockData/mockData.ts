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
