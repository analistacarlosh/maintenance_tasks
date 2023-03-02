import { Task } from '../../task/entity/task.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../utils/entity/base';
import { UserRole } from '../userRole.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  username: string;

  @Column({ length: 250, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ['manager', 'technician'],
    default: 'technician',
  })
  role: UserRole;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
