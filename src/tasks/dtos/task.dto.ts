import { TASK_STATUS } from '../task-status.enum';

export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: TASK_STATUS;
}
