import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SigninDto) {
    try {
      const token = await this.authService.signin(body.username, body.password);
      return { access_token: token };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw {
          error: 'Credenciais inválidas. Nome de Usuário ou Senha não conferem',
        };
      }
    }
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
