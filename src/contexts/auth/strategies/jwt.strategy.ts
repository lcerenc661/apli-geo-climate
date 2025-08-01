import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as (
        req: any,
      ) => string | null,
      ignoreExpiration: false,
      secretOrKey:
        (configService.get<string>('JWT_SECRET') as string) ?? ('' as string),
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}
