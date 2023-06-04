import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { User } from '../users/entities/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(username: string, pwd: string) {
    // Throws NotFoundException
    const user = await this.usersService.findOne({ username });
    if (!user.comparePassword(pwd)) throw new UnauthorizedException();
    const payload = { id: user.id, username: user.username };
    return await this.jwtService.signAsync(payload);
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
