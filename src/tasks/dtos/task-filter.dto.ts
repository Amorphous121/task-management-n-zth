import { TASK_STATUS } from '../task-status.enum';

export class GetTasksFilterDto {
  status?: TASK_STATUS;
  search?: string;
}
