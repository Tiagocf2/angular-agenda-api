import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from './users.repository';
const md5 = require('md5');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private usersRepo: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = md5(createUserDto.password);
    //TODO: tratar erros
    return await this.usersRepo.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne({
    id,
    username,
  }: {
    id?: string;
    username?: string;
  }): Promise<User> {
    if (!id && !username) throw new NotFoundException();
    let user: User;
    if (id) {
      user = await this.usersRepo.findById(id);
    } else {
      user = await this.usersRepo.findByUsername(username);
    }
    if (!user) throw new NotFoundException();

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(id, updateUserDto);
  }
}
