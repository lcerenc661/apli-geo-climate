import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomErrorHandler } from './contexts/shared/error/custom-error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomErrorHandler());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
