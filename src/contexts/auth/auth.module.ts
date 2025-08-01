import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.moudule';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './interface/guards/jwt-auth.guards';
import { AuthController } from './controller/auth.controller';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from './interface/guards/api-key.guards';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'Token', // This should be replaced with a secure secret from environment variables
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    ApiKeyGuard,
    ConfigService,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
