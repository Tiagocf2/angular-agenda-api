import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { IsPublic } from 'src/common/decorators';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SigninDto) {
    try {
      const payload = await this.authService.signin(
        body.username,
        body.password,
      );
      return {
        access_token: payload.token,
        id: payload.user.id,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw new HttpException(
          {
            error:
              'Credenciais inválidas. Nome de Usuário ou Senha não conferem',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  @IsPublic()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignupDto) {
    try {
      const user = await this.authService.signup(body);
      return {
        username: user.username,
        name: user.name,
        email: user.email,
        address: user.address,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          {
            error: 'Nome de usuário já existe. Escolha outro, por favor ',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }
}
