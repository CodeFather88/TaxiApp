import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
type JwtPayload = { id: number; role: string };
import { IS_PUBLIC_KEY } from 'src/shared/decorators';
import { type IJwtAdapter } from '../../../domain/ports/jwt.port';
import { TOKENS } from 'src/shared/types';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(TOKENS.IJwtAdapter) private readonly jwtAdapter: IJwtAdapter,
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
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtAdapter.verify<JwtPayload>(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}