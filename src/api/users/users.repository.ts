import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
  }
}
