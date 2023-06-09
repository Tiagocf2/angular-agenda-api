import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskStatus } from './enums/task-status.enum';
import { ListTaskQueryDto } from './dto/list-task.dto';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  listByUser(userId: string, query: ListTaskQueryDto): Promise<TaskDocument[]> {
    const queries = <any>[];
    if (query.status) {
      queries.push({ status: query.status });
    } else {
      queries.push({ status: { $ne: TaskStatus.INACTIVE.toString() } });
    }

    if (query.priority) {
      queries.push({ priority: query.priority });
    }

    if (query.search) {
      queries.push({
        $or: [
          { title: { $regex: new RegExp(queries.search, 'i') } },
          { description: { $regex: new RegExp(queries.search, 'i') } },
        ],
      });
    }

    return this.taskModel
      .find({
        $and: [{ user: userId }, ...queries],
      })
      .exec();
  }

  getAmountByStatus(userId: string, status: TaskStatus): Promise<number> {
    return this.taskModel
      .find({
        user: userId,
        status: status.toString(),
      })
      .count()
      .exec();
  }

  getAmount(userId: string): Promise<number> {
    return this.taskModel
      .find({
        user: userId,
      })
      .count()
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
