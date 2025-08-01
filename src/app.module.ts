import { Module } from '@nestjs/common';
import { ZoneModule } from './contexts/zones/zone.module';
import { TemperatureRecordModule } from './contexts/temperature-records/temperature-record.module';
import { AuthModule } from './contexts/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ZoneModule,
    TemperatureRecordModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
