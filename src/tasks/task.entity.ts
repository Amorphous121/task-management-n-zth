import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TASK_STATUS } from './task-status.enum';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TASK_STATUS;
}
