import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TASK_STATUS } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  createTask(payload: CreateTaskDto): Promise<Task> {
    const task = this.create({
      ...payload,
      status: TASK_STATUS.OPEN,
    });

    return this.save(task);
  }
}
