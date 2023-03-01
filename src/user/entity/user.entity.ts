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
// import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  // @BeforeInsert()
  // async setPassword(password: string) {
  //   const salt = await bcrypt.genSalt();
  //   this.password = await bcrypt.hash(password || this.password, salt);
  // }

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
