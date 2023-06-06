import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { removeDuplicatesFromArray } from 'src/utils/helpers';
import { Task } from './entities/task.schema';

@Injectable()
export class TasksService {
  constructor(private taskRepo: TasksRepository) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    if (!!createTaskDto.tags?.length) {
      createTaskDto.tags = removeDuplicatesFromArray(
        createTaskDto.tags.map((e) => e.toLowerCase()),
      );
    }
    return this.taskRepo.create(createTaskDto);
  }

  findAll(userId: string): Promise<Task[]> {
    return this.taskRepo.listByUser(userId);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!!updateTaskDto.tags?.length) {
      updateTaskDto.tags = removeDuplicatesFromArray(
        updateTaskDto.tags.map((e) => e.toLowerCase()),
      );
    }
    const task = await this.taskRepo.update(id, updateTaskDto);
    if (!task) throw new NotFoundException();
    return task;
  }

  async remove(id: string): Promise<void> {
    const success = await this.taskRepo.remove(id);
    if (!success) throw new NotFoundException();
  }
}
