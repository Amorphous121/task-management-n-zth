import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TASK_STATUS } from './task-status.enum';
import { GetTasksFilterDto } from './dtos/task-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasks(
    getTaskFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(getTaskFilterDto, user);
  }

  async getTaskByid(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException(`Task with ${id} doesn't exists!`);
    return task;
  }

  createTask(payload: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(payload, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });

    if (result.affected == 0)
      throw new NotFoundException(`Task with ${id} doesn't exists`);
  }

  async updateTaskStatus(
    id: string,
    status: TASK_STATUS,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskByid(id, user);
    task.status = status;
    return this.taskRepository.save(task);
  }
}
