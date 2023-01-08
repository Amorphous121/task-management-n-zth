import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/task-filter.dto';
import { TASK_STATUS } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger(TaskRepository.name);

  constructor(private readonly datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }

  async getTasks(
    getTaskFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = getTaskFilterDto;
    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `failed to get tasks for user "${
          user.username
        }" with filters: ${JSON.stringify(getTaskFilterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  createTask(payload: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({
      ...payload,
      user,
      status: TASK_STATUS.OPEN,
    });

    return this.save(task);
  }
}
