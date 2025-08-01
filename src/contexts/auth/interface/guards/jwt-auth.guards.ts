/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MissingOrInvalidBearerTokenError } from 'src/contexts/shared/error/auth-errors';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      throw new MissingOrInvalidBearerTokenError();
    }
    return user;
  }
}
