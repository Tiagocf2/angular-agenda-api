import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.schema';
// import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    // const newUser = new this.userModel();
    // await newUser.save();
    // console.log('NEW', newUser);

    console.log('PTA');
    return 'oi';
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
      // user = await this.userModel.findById(id).exec();0
    } else {
      // user = await this.userModel.findOne({ username }).exec();
    }
    if (!user) throw new NotFoundException();

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
