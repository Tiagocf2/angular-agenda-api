import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  dueDate: Date;

  @Prop()
  finishedDate: Date;

  @Prop()
  tags: string[];

  @Prop({ type: Number, enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.INCOMPLETE })
  status: TaskStatus;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
