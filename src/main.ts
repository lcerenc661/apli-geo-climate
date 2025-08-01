import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrorHandler } from './contexts/shared/error/custom-error-handler';
import { ApiKeyGuard } from './contexts/auth/interface/guards/api-key.guards';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomErrorHandler());
  app.useGlobalGuards(new ApiKeyGuard(app.get(ConfigService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
