import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  listByUser(userId: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({
        user: userId,
        status: { $ne: TaskStatus.INACTIVE.toString() },
      })
      .exec();
  }

  findById(id: string): Promise<TaskDocument | undefined> {
    return this.taskModel.findById(id).exec();
  }

  update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument | undefined> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.taskModel
      .findByIdAndUpdate(id, {
        status: TaskStatus.INACTIVE,
      })
      .exec();
    return result != null;
  }
}
