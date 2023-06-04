import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/is-public.decorator';
import { Environment } from 'src/core/config/environment.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const secret = this.configService.get<string>(Environment.JWT_SECRET);
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret });
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private getTokenFromRequest(request: Request): string | undefined {
    if (request.headers.authorization) {
      const [type, token] = request.headers.authorization.split(' ');
      if (type == 'Bearer') return token;
    }
    return undefined;
  }
}
