import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { User } from '../users/entities/user.schema';
const md5 = require('md5');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(username: string, pwd: string) {
    // Throws NotFoundException
    const user = await this.usersService.findOne({ username });
    if (user.password !== md5(pwd)) throw new UnauthorizedException();
    const payload = { id: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });
    return { token, user: payload };
  }

  async signup(signupDto: SignupDto): Promise<User> {
    try {
      await this.usersService.findOne({ username: signupDto.username });
      throw new ConflictException();
    } catch (error) {
      if (!(error instanceof NotFoundException)) throw error;
    }
    return await this.usersService.create(signupDto);
  }
}
