import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  HttpException,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ListTaskQueryDto } from './dto/list-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Param('userId') userId, @Query() query: ListTaskQueryDto) {
    return this.tasksService.findAll(userId, query);
  }

  @Get('stats')
  async stats(@Param('userId') userId: string) {
    return await this.tasksService.getStats(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.tasksService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
