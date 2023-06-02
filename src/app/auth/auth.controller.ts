import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body.username, body.password);
  }

  @Post('signup')
  // @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignupDto) {
    try {
      await this.authService.signup(body);
      console.log('oioioi');
      // return;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          'Nome de usuário já existe. Escolha outro, por favor ',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
