import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZoneModule } from './contexts/zone/zone.module';
import { TemperatureRecordModule } from './contexts/temperature-record/temperature-record.module';

@Module({
  imports: [ZoneModule, TemperatureRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
