import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { MissingOrInvalidApiKeyError } from 'src/contexts/shared/error/auth-errors';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('ApiKeyGuard: Checking API key...');
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;

    const validApiKey = this.configService.get<string>('API_KEY');

    if (apiKey !== validApiKey) {
      throw new MissingOrInvalidApiKeyError();
    }

    return true;
  }
}
