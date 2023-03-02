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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 30, nullable: false })
  username: string;

  @ApiProperty()
  @Column({ length: 250, nullable: false })
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['manager', 'technician'],
    default: 'technician',
  })
  role: UserRole;

  @ApiProperty()
  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
