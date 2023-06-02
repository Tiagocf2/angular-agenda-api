import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signin(username: string, pwd: string) {
    // Throws NotFoundException
    const user = await this.usersService.findOne({ username });
    console.log('COMPAROUU:', user.comparePassword(pwd));
  }

  async signup(signupDto: SignupDto): Promise<void> {
    try {
      await this.usersService.findOne({ username: signupDto.username });
      console.log('deu erro');
      throw new ConflictException();
    } catch (error) {
      if (!(error instanceof NotFoundException)) throw error;
    }
    console.log('ALSDAOSD');
    await this.usersService.create(signupDto);
  }
}
