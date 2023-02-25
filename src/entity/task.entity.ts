import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BaseEntity } from "./base";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  summary: string;

}
