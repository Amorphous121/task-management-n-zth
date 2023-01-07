import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TASK_STATUS } from './task-status.enum';
import { GetTasksFilterDto } from './dtos/task-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTaskByid(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ${id} doesn't exists!`);
    return task;
  }

  createTask(payload: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(payload);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected == 0)
      throw new NotFoundException(`Task with ${id} doesn't exists`);
  }

  async updateTaskStatus(id: string, status: TASK_STATUS): Promise<Task> {
    const task = await this.getTaskByid(id);
    task.status = status;
    return this.taskRepository.save(task);
  }
}
