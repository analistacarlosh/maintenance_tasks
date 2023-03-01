import { User } from '../../user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../utils/entity/base';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  title: string;

  @Column({ length: 2500, nullable: false })
  summary: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
