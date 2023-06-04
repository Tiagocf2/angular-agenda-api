import {
  ArrayNotEmpty,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinDate,
} from 'class-validator';
import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @IsNumber()
  priority: TaskPriority;

  @IsOptional()
  @ArrayNotEmpty()
  tags: string[];
}
