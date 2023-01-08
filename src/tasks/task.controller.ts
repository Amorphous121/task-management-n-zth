import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/task-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  private logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query() getTasksFilterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retriving all tasks. Filters: ${JSON.stringify(
        getTasksFilterDto,
      )}`,
    );
    return this.taskService.getTasks(getTasksFilterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" retriving tasks by Id = ${id}`,
    );
    return this.taskService.getTaskByid(id, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() body: CreateTaskDto,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating new task with payload = ${JSON.stringify(body)}`,
    );
    return this.taskService.createTask(body, user);
  }

  @Delete('/:id')
  deleteTask(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" Deleting task having id = ${id}`,
    );
    return this.taskService.deleteTask(id, user);
  }

  @Put('/:id')
  updateTaskStatus(
    @GetUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTaskStatusDto,
  ) {
    this.logger.verbose(
      `User "${user.username}" Changing task status to = ${body.status}`,
    );
    const { status } = body;
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
