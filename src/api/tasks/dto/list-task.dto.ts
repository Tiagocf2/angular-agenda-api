import { IsOptional } from 'class-validator';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export class ListTaskQueryDto {
  @IsOptional()
  search: string;

  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  priority: TaskPriority;
}
