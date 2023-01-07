import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/task-filter.dto';
import { UpdateTaskStatusDto } from './dtos/update-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService;
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.taskService.getTaskByid(id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(body);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Put('/:id')
  updateTaskStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTaskStatusDto,
  ) {
    const { status } = body;
    return this.taskService.updateTaskStatus(id, status);
  }
}
